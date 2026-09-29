import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { createUser, deleteUser, fetchUsers, updateUser } from '../../app/store/managementSlice';
import { selectSearch } from '../../app/store/selectors';
import { showToast } from '../../app/store/uiSlice';
import { ConfirmModal } from '../../shared/components/ConfirmModal';
import { ManagementForm } from '../../shared/components/ManagementForm';
import type { User } from '../../shared/types/domain';

export default function UsersPage() {
  const dispatch = useAppDispatch(); const users = useAppSelector((state) => state.management.users); const loading = useAppSelector((state) => state.management.loading); const error = useAppSelector((state) => state.management.error); const query = useAppSelector(selectSearch).trim().toLocaleLowerCase(); const visibleUsers = users.filter((user) => !query || `${user.name} ${user.email} ${user.role}`.toLocaleLowerCase().includes(query));
  const [removeId, setRemoveId] = useState<number | null>(null); const [editing, setEditing] = useState<Partial<User> | null>(null);
  useEffect(() => { void dispatch(fetchUsers()); }, [dispatch]);
  const notify = (message: string, type: 'success' | 'error') => dispatch(showToast({ message, type }));
  const save = (data: { name: string; email?: string; role?: string }) => { const request = editing?.id ? dispatch(updateUser({ id: editing.id, data })) : dispatch(createUser({ name: data.name, email: data.email ?? '', role: data.role ?? 'Наблюдатель' })); void request.unwrap().then(() => { setEditing(null); notify('Пользователь сохранён', 'success'); }).catch(() => notify('Не удалось сохранить пользователя', 'error')); };
  const remove = () => { if (removeId === null) return; void dispatch(deleteUser(removeId)).unwrap().then(() => { setRemoveId(null); notify('Пользователь удалён', 'success'); }).catch(() => notify('Не удалось удалить пользователя', 'error')); };
  return <><div className="heading"><div><label>КОМАНДА</label><h1 className="text-3xl font-bold">Пользователи</h1><p>Управление доступом и ролями команды</p></div><button className="primary rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white" onClick={() => setEditing({})}>＋ Пригласить</button></div>
    {loading && <div className="page-loading">Загрузка…</div>}{error && <div className="alert alert-danger" role="alert">{error}</div>}{!loading && !visibleUsers.length && <div className="empty rounded-2xl border border-dashed bg-white">Пользователи не найдены</div>}
    <div className="table overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><table><thead><tr><th>ПОЛЬЗОВАТЕЛЬ</th><th>РОЛЬ</th><th>СТАТУС</th><th /></tr></thead><tbody>{visibleUsers.map((user) => <tr className="hover:bg-indigo-50/40" key={user.id}><td><b>{user.name}</b><small>{user.email}</small></td><td><span className="role">{user.role}</span></td><td><span className="status ok">● Активен</span></td><td><button className="mr-3 text-indigo-600" onClick={() => setEditing(user)}>Изменить</button><button className="text-rose-500" onClick={() => setRemoveId(user.id)}>Удалить</button></td></tr>)}</tbody></table></div>
    {removeId !== null && <ConfirmModal title="Удалить пользователя?" description="Доступ пользователя будет удалён." busy={loading} onClose={() => setRemoveId(null)} onConfirm={remove} />}{editing && <div className="backdrop"><div className="modal rounded-2xl bg-white p-7"><button className="modal-close" aria-label="Закрыть" onClick={() => setEditing(null)}>×</button><h2 className="mb-4 text-xl font-bold">{editing.id ? 'Изменить пользователя' : 'Новый пользователь'}</h2><ManagementForm kind="user" initial={{ name: editing.name ?? '', email: editing.email ?? '', role: editing.role ?? 'Наблюдатель' }} onCancel={() => setEditing(null)} onSubmit={save} /></div></div>}</>;
}
