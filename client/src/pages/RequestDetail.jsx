import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { requestsApi, usersApi } from '../api/resources.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Spinner, StatusBadge, PriorityTag, Button, Modal, Field, Select, Textarea } from '../components/ui.jsx';

// Which next statuses each role can move a request to, given its current status.
const OFFICER_NEXT = { ASSIGNED: ['IN_PROGRESS'], IN_PROGRESS: ['COMPLETED'] };

function Timeline({ updates }) {
  if (!updates?.length) {
    return <p className="text-sm text-slate-500">No status history yet.</p>;
  }
  return (
    <ol className="relative space-y-4 border-l border-slate-200 pl-5">
      {updates.map((u) => (
        <li key={u.id} className="relative">
          <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-white" />
          <div className="flex items-center gap-2">
            <StatusBadge status={u.newStatus} />
            <span className="text-xs text-slate-400">
              {new Date(u.createdAt).toLocaleString()}
            </span>
          </div>
          {u.comment && <p className="mt-1 text-sm text-slate-600">{u.comment}</p>}
          <p className="text-xs text-slate-400">by {u.updatedBy?.fullName}</p>
        </li>
      ))}
    </ol>
  );
}

export default function RequestDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null); // 'assign' | 'status' | null

  const { data: request, isLoading, error } = useQuery({
    queryKey: ['request', id],
    queryFn: () => requestsApi.get(id),
  });

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ['request', id] });
    queryClient.invalidateQueries({ queryKey: ['requests'] });
  }

  const cancelMutation = useMutation({
    mutationFn: () => requestsApi.cancel(id),
    onSuccess: () => { invalidate(); toast.success('Request cancelled'); },
    onError: (e) => toast.error(e.message),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-600">{error.message}</p>;

  const activeAssignment = request.assignments?.[0];
  const isOwner = request.requester?.id === user.id;
  const canCancel = isOwner && request.status === 'PENDING';
  const canAssign = user.role === 'ADMIN' && ['PENDING', 'ASSIGNED'].includes(request.status);
  const officerNext = user.role === 'OFFICER' ? OFFICER_NEXT[request.status] : null;
  const canUpdateStatus =
    (user.role === 'ADMIN' && !['COMPLETED', 'CANCELLED', 'REJECTED'].includes(request.status)) ||
    (officerNext && officerNext.length > 0);

  return (
    <div className="space-y-6">
      <Link to="/requests" className="text-sm text-indigo-600 hover:underline">← Back to requests</Link>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-3 flex items-start justify-between gap-4">
              <h1 className="text-xl font-bold text-slate-800">{request.title}</h1>
              <StatusBadge status={request.status} />
            </div>
            <p className="whitespace-pre-wrap text-slate-600">{request.description}</p>

            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm">
              <div><dt className="text-slate-400">Category</dt><dd className="font-medium text-slate-700">{request.category?.name}</dd></div>
              <div><dt className="text-slate-400">Location</dt><dd className="font-medium text-slate-700">{request.location}</dd></div>
              <div><dt className="text-slate-400">Priority</dt><dd><PriorityTag priority={request.priority} /></dd></div>
              <div><dt className="text-slate-400">Submitted</dt><dd className="font-medium text-slate-700">{new Date(request.createdAt).toLocaleDateString()}</dd></div>
              <div><dt className="text-slate-400">Requester</dt><dd className="font-medium text-slate-700">{request.requester?.fullName}</dd></div>
              <div><dt className="text-slate-400">Assigned officer</dt><dd className="font-medium text-slate-700">{activeAssignment?.officer?.fullName || '—'}</dd></div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-slate-700">Status timeline</h2>
            <Timeline updates={request.statusUpdates} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 font-semibold text-slate-700">Actions</h2>
            <div className="space-y-2">
              {canAssign && (
                <Button className="w-full" onClick={() => setModal('assign')}>
                  {activeAssignment ? 'Reassign officer' : 'Assign officer'}
                </Button>
              )}
              {canUpdateStatus && (
                <Button variant="secondary" className="w-full" onClick={() => setModal('status')}>
                  Update status
                </Button>
              )}
              {canCancel && (
                <Button variant="danger" className="w-full" disabled={cancelMutation.isPending} onClick={() => cancelMutation.mutate()}>
                  Cancel request
                </Button>
              )}
              {!canAssign && !canUpdateStatus && !canCancel && (
                <p className="text-sm text-slate-500">No actions available for your role.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {modal === 'assign' && <AssignModal request={request} onClose={() => setModal(null)} onDone={invalidate} />}
      {modal === 'status' && (
        <StatusModal request={request} role={user.role} onClose={() => setModal(null)} onDone={invalidate} />
      )}
    </div>
  );
}

function AssignModal({ request, onClose, onDone }) {
  const [officerId, setOfficerId] = useState('');
  const [note, setNote] = useState('');
  const { data: officers = [] } = useQuery({ queryKey: ['officers'], queryFn: usersApi.officers });

  const mutation = useMutation({
    mutationFn: () => requestsApi.assign(request.id, { officerId: Number(officerId), note: note || undefined }),
    onSuccess: () => { onDone(); toast.success('Officer assigned'); onClose(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Modal title="Assign officer" onClose={onClose}>
      <div className="space-y-4">
        <Field label="Officer">
          <Select value={officerId} onChange={(e) => setOfficerId(e.target.value)}>
            <option value="">Select an officer…</option>
            {officers.map((o) => <option key={o.id} value={o.id}>{o.fullName} ({o.department})</option>)}
          </Select>
        </Field>
        <Field label="Note (optional)">
          <Textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button disabled={!officerId || mutation.isPending} onClick={() => mutation.mutate()}>
            {mutation.isPending ? 'Assigning…' : 'Assign'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function StatusModal({ request, role, onClose, onDone }) {
  // Admins get broad control; officers get their allowed next steps.
  const ADMIN_OPTIONS = {
    PENDING: ['ASSIGNED', 'REJECTED'],
    ASSIGNED: ['IN_PROGRESS', 'REJECTED'],
    IN_PROGRESS: ['COMPLETED', 'REJECTED'],
  };
  const options = role === 'OFFICER' ? OFFICER_NEXT[request.status] || [] : ADMIN_OPTIONS[request.status] || [];

  const [newStatus, setNewStatus] = useState(options[0] || '');
  const [comment, setComment] = useState('');

  const mutation = useMutation({
    mutationFn: () => requestsApi.updateStatus(request.id, { newStatus, comment: comment || undefined }),
    onSuccess: () => { onDone(); toast.success('Status updated'); onClose(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Modal title="Update status" onClose={onClose}>
      <div className="space-y-4">
        <Field label="New status">
          <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            {options.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </Select>
        </Field>
        <Field label="Comment (optional)">
          <Textarea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} />
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button disabled={!newStatus || mutation.isPending} onClick={() => mutation.mutate()}>
            {mutation.isPending ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
