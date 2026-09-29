import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { login } from '../../app/store/authSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('alexey@inventory.io');
  const [password, setPassword] = useState('password123');
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) navigate('/orders', { replace: true });
  };
  return <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
    <form className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl" onSubmit={submit}>
      <h1 className="mb-2 text-3xl font-bold">Inventory</h1>
      <p className="mb-6 text-slate-500">Вход в систему управления складом</p>
      <label className="mb-4 block text-sm font-medium">Email<input className="mt-1 w-full rounded-xl border p-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label className="mb-4 block text-sm font-medium">Пароль<input className="mt-1 w-full rounded-xl border p-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></label>
      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
      <button className="w-full rounded-xl bg-indigo-600 p-3 font-semibold text-white disabled:opacity-50" disabled={loading}>{loading ? 'Вход…' : 'Войти'}</button>
    </form>
  </main>;
}
