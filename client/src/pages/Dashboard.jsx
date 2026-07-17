import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { requestsApi } from '../api/resources.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Spinner, StatusBadge, Button } from '../components/ui.jsx';

const STATUSES = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED'];

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${accent || 'text-slate-800'}`}>{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  // Fetch a wide page to compute simple counts client-side (MVP).
  const { data, isLoading } = useQuery({
    queryKey: ['requests', 'dashboard'],
    queryFn: () => requestsApi.list({ limit: 50 }),
  });

  if (isLoading) return <Spinner />;

  const requests = data?.data || [];
  const total = data?.meta?.total ?? requests.length;
  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = requests.filter((r) => r.status === s).length;
    return acc;
  }, {});

  const greeting = {
    REQUESTER: 'Track your maintenance requests',
    OFFICER: 'Your assigned jobs',
    ADMIN: 'System overview',
  }[user.role];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hello, {user.fullName.split(' ')[0]}</h1>
          <p className="text-sm text-slate-500">{greeting}</p>
        </div>
        {user.role === 'REQUESTER' && (
          <Link to="/requests/new"><Button>+ New Request</Button></Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total" value={total} accent="text-indigo-600" />
        <StatCard label="Pending" value={counts.PENDING} accent="text-yellow-600" />
        <StatCard label="In Progress" value={counts.IN_PROGRESS} accent="text-indigo-600" />
        <StatCard label="Completed" value={counts.COMPLETED} accent="text-green-600" />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <h2 className="font-semibold text-slate-700">Recent activity</h2>
          <Link to="/requests" className="text-sm text-indigo-600 hover:underline">View all →</Link>
        </div>
        {requests.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">No requests yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {requests.slice(0, 6).map((r) => (
              <li key={r.id} className="flex items-center justify-between px-5 py-3">
                <Link to={`/requests/${r.id}`} className="min-w-0">
                  <p className="truncate font-medium text-slate-700 hover:text-indigo-600">{r.title}</p>
                  <p className="text-xs text-slate-500">{r.category?.name} · {r.location}</p>
                </Link>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
