import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { requestsApi, categoriesApi } from '../api/resources.js';
import { Spinner, StatusBadge, PriorityTag, EmptyState, Input, Select, Button } from '../components/ui.jsx';

const STATUSES = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED'];

export default function Requests() {
  const [filters, setFilters] = useState({ search: '', status: '', categoryId: '', page: 1 });

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: categoriesApi.list });
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['requests', filters],
    queryFn: () =>
      requestsApi.list({
        search: filters.search || undefined,
        status: filters.status || undefined,
        categoryId: filters.categoryId || undefined,
        page: filters.page,
        limit: 10,
      }),
    keepPreviousData: true,
  });

  function update(key, value) {
    setFilters((f) => ({ ...f, [key]: value, page: 1 }));
  }

  const requests = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Service Requests</h1>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3">
        <Input
          placeholder="Search title, description, location…"
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
        />
        <Select value={filters.status} onChange={(e) => update('status', e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </Select>
        <Select value={filters.categoryId} onChange={(e) => update('categoryId', e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
      </div>

      {isLoading ? (
        <Spinner />
      ) : requests.length === 0 ? (
        <EmptyState title="No requests found" subtitle="Try adjusting your filters." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link to={`/requests/${r.id}`} className="font-medium text-slate-700 hover:text-indigo-600">
                      {r.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{r.category?.name}</td>
                  <td className="px-4 py-3 text-slate-500">{r.location}</td>
                  <td className="px-4 py-3"><PriorityTag priority={r.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Page {meta.page} of {meta.totalPages} · {meta.total} total
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={filters.page <= 1 || isFetching}
              onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              disabled={filters.page >= meta.totalPages || isFetching}
              onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
