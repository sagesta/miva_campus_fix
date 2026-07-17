import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { requestsApi, categoriesApi } from '../api/resources.js';
import { Button, Field, Input, Textarea, Select, Spinner } from '../components/ui.jsx';

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export default function NewRequest() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery({ queryKey: ['categories'], queryFn: categoriesApi.list });

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    categoryId: '',
    priority: 'MEDIUM',
  });
  const [errors, setErrors] = useState([]);

  const mutation = useMutation({
    mutationFn: (body) => requestsApi.create(body),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      toast.success('Request submitted!');
      navigate(`/requests/${created.id}`);
    },
    onError: (err) => {
      if (err.details) setErrors(err.details);
      toast.error(err.message);
    },
  });

  function update(key, value) {
    setForm({ ...form, [key]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    mutation.mutate({ ...form, categoryId: Number(form.categoryId) });
  }

  const fieldError = (name) => errors.find((d) => d.field === name)?.message;

  if (isLoading) return <Spinner />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-slate-800">New Service Request</h1>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <Field label="Title" error={fieldError('title')}>
          <Input required value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Short summary of the issue" />
        </Field>

        <Field label="Description" error={fieldError('description')}>
          <Textarea required rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe the problem in detail" />
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Category" error={fieldError('categoryId')}>
            <Select required value={form.categoryId} onChange={(e) => update('categoryId', e.target.value)}>
              <option value="">Select a category…</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>

          <Field label="Priority" error={fieldError('priority')}>
            <Select value={form.priority} onChange={(e) => update('priority', e.target.value)}>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
        </div>

        <Field label="Location" error={fieldError('location')}>
          <Input required value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. Hostel B, Room 214" />
        </Field>

        <div className="flex gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting…' : 'Submit request'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
