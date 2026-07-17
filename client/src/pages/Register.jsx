import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import { Button, Field, Input, Select } from '../components/ui.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'STUDENT',
    department: '',
  });
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  function update(key, value) {
    setForm({ ...form, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);
    try {
      await register(form);
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      if (err.details) setErrors(err.details);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const fieldError = (name) => errors.find((d) => d.field === name)?.message;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">Create your account</h1>
          <p className="text-sm text-slate-500">Register as a student or staff requester</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Field label="Full name" error={fieldError('fullName')}>
            <Input required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} />
          </Field>
          <Field label="Email" error={fieldError('email')}>
            <Input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} />
          </Field>
          <Field label="Password" error={fieldError('password')}>
            <Input type="password" required value={form.password} onChange={(e) => update('password', e.target.value)} />
          </Field>
          <Field label="I am a" error={fieldError('userType')}>
            <Select value={form.userType} onChange={(e) => update('userType', e.target.value)}>
              <option value="STUDENT">Student</option>
              <option value="STAFF">Staff</option>
            </Select>
          </Field>
          <Field label="Department / Hostel" error={fieldError('department')}>
            <Input value={form.department} onChange={(e) => update('department', e.target.value)} placeholder="e.g. Hostel B" />
          </Field>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Creating…' : 'Register'}
          </Button>
          <p className="text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
