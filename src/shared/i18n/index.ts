import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      orders: 'Приходы',
      groups: 'Группы',
      products: 'Продукты',
      users: 'Пользователи',
      settings: 'Настройки',
      activeSessions: 'Активные сессии',
      search: 'Поиск по складу',
      delete: 'Удалить',
      cancel: 'Отмена',
      save: 'Сохранить',
      edit: 'Изменить',
      loading: 'Загрузка…',
      empty: 'Ничего не найдено',
      confirm: 'Подтвердить',
      error: 'Операция не выполнена',
      success: 'Операция выполнена',
    },
  },
  en: {
    translation: {
      orders: 'Orders',
      groups: 'Groups',
      products: 'Products',
      users: 'Users',
      settings: 'Settings',
      activeSessions: 'Active sessions',
      search: 'Search inventory',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      loading: 'Loading…',
      empty: 'Nothing found',
      confirm: 'Confirm',
      error: 'Operation failed',
      success: 'Operation completed',
    },
  },
  uk: {
    translation: {
      orders: 'Надходження',
      groups: 'Групи',
      products: 'Продукти',
      users: 'Користувачі',
      settings: 'Налаштування',
      activeSessions: 'Активні сесії',
      search: 'Пошук по складу',
      delete: 'Видалити',
      cancel: 'Скасувати',
      save: 'Зберегти',
      edit: 'Редагувати',
      loading: 'Завантаження…',
      empty: 'Нічого не знайдено',
      confirm: 'Підтвердити',
      error: 'Операцію не виконано',
      success: 'Операцію виконано',
    },
  },
};
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('inventory-language') ?? 'ru',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
export default i18n;
