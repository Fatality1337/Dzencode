import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface SettingsState {
  language: 'ru' | 'en' | 'uk';
  currency: 'USD' | 'EUR' | 'UAH';
}
const saved = typeof window !== 'undefined' ? window.localStorage.getItem('inventory-language') : null;
const slice = createSlice({
  name: 'settings',
  initialState: { language: saved === 'en' || saved === 'uk' ? saved : 'ru', currency: 'USD' } as SettingsState,
  reducers: {
    setLanguage: (s, a: PayloadAction<SettingsState['language']>) => {
      s.language = a.payload;
      window.localStorage.setItem('inventory-language', a.payload);
    },
    setCurrency: (s, a: PayloadAction<SettingsState['currency']>) => {
      s.currency = a.payload;
    },
  },
});
export const { setLanguage, setCurrency } = slice.actions;
export default slice.reducer;
