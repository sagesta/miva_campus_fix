import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Spinner } from './ui.jsx';
import Layout from './Layout.jsx';

// Requires authentication; optionally restricts to specific roles.
export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return (
      <Layout>
        <div className="rounded-lg bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-800">Access denied</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your role ({user.role}) cannot view this page.
          </p>
        </div>
      </Layout>
    );
  }

  return <Layout>{children}</Layout>;
}
