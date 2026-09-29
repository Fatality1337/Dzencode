import { useState } from 'react';

type FormData = { name: string; description?: string; email?: string; role?: string };
export function ManagementForm({ kind, initial, onCancel, onSubmit }: { kind: 'group' | 'user'; initial?: FormData; onCancel: () => void; onSubmit: (data: FormData) => void }) {
  const [name, setName] = useState(initial?.name ?? ''); const [description, setDescription] = useState(initial?.description ?? ''); const [email, setEmail] = useState(initial?.email ?? ''); const [role, setRole] = useState(initial?.role ?? 'Наблюдатель');
  const valid = name.trim().length > 1 && (kind === 'group' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  return <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); if (valid) onSubmit(kind === 'group' ? { name: name.trim(), description: description.trim() } : { name: name.trim(), email: email.trim(), role }); }}>
    <label>Имя / название<input autoFocus className="mt-1 w-full rounded-lg border border-slate-200 p-2" value={name} onChange={(event) => setName(event.target.value)} />{name.length > 0 && name.trim().length < 2 && <small className="text-rose-600">Введите минимум 2 символа</small>}</label>
    {kind === 'group' ? <label>Описание<textarea className="mt-1 w-full rounded-lg border border-slate-200 p-2" value={description} onChange={(event) => setDescription(event.target.value)} /></label> : <><label>Email<input className="mt-1 w-full rounded-lg border border-slate-200 p-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />{email.length > 0 && !valid && <small className="text-rose-600">Введите корректный email</small>}</label><label>Роль<select className="mt-1 w-full rounded-lg border border-slate-200 p-2" value={role} onChange={(event) => setRole(event.target.value)}><option>Администратор</option><option>Менеджер склада</option><option>Наблюдатель</option></select></label></>}
    <div className="flex justify-end gap-2"><button type="button" className="secondary" onClick={onCancel}>Отмена</button><button type="submit" className="primary" disabled={!valid}>Сохранить</button></div>
  </form>;
}
