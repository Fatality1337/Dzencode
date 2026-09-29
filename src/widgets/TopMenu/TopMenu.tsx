import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { setSearch } from '../../app/store/uiSlice';
import { useActiveSessions } from '../../shared/hooks/useActiveSessions';
export function TopMenu() {
  const [now, setNow] = useState(new Date());
  const search = useAppSelector((state) => state.ui.search);
  const dispatch = useAppDispatch();
  const sessions = useActiveSessions();
  const { t } = useTranslation();
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <label className="flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
        <span aria-hidden="true">⌕</span>
        <input
          className="ml-2 w-64 border-0 bg-transparent outline-none"
          aria-label={t('search')}
          placeholder={`${t('search')}…`}
          value={search}
          onChange={(event) => dispatch(setSearch(event.target.value))}
        />
      </label>
      <span className="flex items-center gap-3 text-xs text-slate-500">
        ◷ {now.toLocaleDateString('ru-RU')} {now.toLocaleTimeString('ru-RU')} · {t('activeSessions')}:{' '}
        <b className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-600">{sessions}</b>
      </span>
    </header>
  );
}
