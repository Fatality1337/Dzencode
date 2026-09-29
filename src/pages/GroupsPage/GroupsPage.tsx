import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { createGroup, deleteGroup, fetchGroups, updateGroup } from '../../app/store/managementSlice';
import { selectSearch } from '../../app/store/selectors';
import { showToast } from '../../app/store/uiSlice';
import { ConfirmModal } from '../../shared/components/ConfirmModal';
import { ManagementForm } from '../../shared/components/ManagementForm';
import type { Group } from '../../shared/types/domain';

export default function GroupsPage() {
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.management.groups);
  const loading = useAppSelector((state) => state.management.loading);
  const error = useAppSelector((state) => state.management.error);
  const query = useAppSelector(selectSearch).trim().toLocaleLowerCase();
  const visibleGroups = groups.filter(
    (group) => !query || `${group.name} ${group.description}`.toLocaleLowerCase().includes(query),
  );
  const [removeId, setRemoveId] = useState<number | null>(null);
  const [editing, setEditing] = useState<Partial<Group> | null>(null);
  useEffect(() => {
    void dispatch(fetchGroups());
  }, [dispatch]);
  const notify = (message: string, type: 'success' | 'error') => dispatch(showToast({ message, type }));
  const save = (data: { name: string; description?: string }) => {
    const request = editing?.id
      ? dispatch(updateGroup({ id: editing.id, data }))
      : dispatch(createGroup({ name: data.name, description: data.description ?? '' }));
    void request
      .unwrap()
      .then(() => {
        setEditing(null);
        notify('Группа сохранена', 'success');
      })
      .catch(() => notify('Не удалось сохранить группу', 'error'));
  };
  const remove = () => {
    if (removeId === null) return;
    void dispatch(deleteGroup(removeId))
      .unwrap()
      .then(() => {
        setRemoveId(null);
        notify('Группа удалена', 'success');
      })
      .catch(() => notify('Не удалось удалить группу', 'error'));
  };
  return (
    <>
      <div className="heading">
        <div>
          <label>КАТЕГОРИИ</label>
          <h1 className="text-3xl font-bold">Группы</h1>
          <p>Организуйте товары по категориям</p>
        </div>
        <button
          className="primary rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white"
          onClick={() => setEditing({})}
        >
          ＋ Новая группа
        </button>
      </div>
      {loading && <div className="page-loading">Загрузка…</div>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!loading && !visibleGroups.length && (
        <div className="empty rounded-2xl border border-dashed bg-white">Группы не найдены</div>
      )}
      <div className="grid">
        {visibleGroups.map((group) => (
          <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" key={group.id}>
            <div className="groupicon blue">◇</div>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <hr />
            <button className="mr-3 text-indigo-600" onClick={() => setEditing(group)}>
              Изменить
            </button>
            <button className="text-rose-500" onClick={() => setRemoveId(group.id)}>
              Удалить
            </button>
          </article>
        ))}
      </div>
      {removeId !== null && (
        <ConfirmModal
          title="Удалить группу?"
          description="Группа будет удалена."
          busy={loading}
          onClose={() => setRemoveId(null)}
          onConfirm={remove}
        />
      )}
      {editing && (
        <div className="backdrop">
          <div className="modal rounded-2xl bg-white p-7">
            <button className="modal-close" aria-label="Закрыть" onClick={() => setEditing(null)}>
              ×
            </button>
            <h2 className="mb-4 text-xl font-bold">{editing.id ? 'Изменить группу' : 'Новая группа'}</h2>
            <ManagementForm
              kind="group"
              initial={{ name: editing.name ?? '', description: editing.description ?? '' }}
              onCancel={() => setEditing(null)}
              onSubmit={save}
            />
          </div>
        </div>
      )}
    </>
  );
}
