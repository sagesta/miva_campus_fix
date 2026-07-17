import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import { Button, Field, Input } from '../components/ui.jsx';

const DEMO = [
  ['Admin', 'admin@university.edu'],
  ['Officer', 'officer1@university.edu'],
  ['Requester', 'student@university.edu'],
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">CampusFix</h1>
          <p className="text-sm text-slate-500">University Maintenance & Service Requests</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Field label="Email">
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@university.edu"
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </Field>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>

          <p className="text-center text-sm text-slate-500">
            No account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
          </p>
        </form>

        <div className="mt-4 rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
          <p className="mb-1 font-medium">Demo accounts (password: password123)</p>
          {DEMO.map(([role, email]) => (
            <button
              key={email}
              onClick={() => setForm({ email, password: 'password123' })}
              className="mr-2 mt-1 rounded bg-white px-2 py-1 hover:bg-indigo-50"
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
