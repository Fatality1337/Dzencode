import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface UiState { search: string; activeSessions: number; }
const slice = createSlice({ name: 'ui', initialState: { search: '', activeSessions: 1 } as UiState, reducers: { setSearch: (s, a: PayloadAction<string>) => { s.search = a.payload; } } }); export const { setSearch } = slice.actions; export default slice.reducer;
