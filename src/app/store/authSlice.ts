import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authApi, type AuthUser } from '../../shared/api/authApi';
import { AUTH_TOKEN_KEY, storage } from '../../shared/utils/storage';

type AuthState = { token: string | null; user: AuthUser | null; loading: boolean; error: string | null };
const initialState: AuthState = { token: storage.get<string | null>(AUTH_TOKEN_KEY, null), user: null, loading: false, error: null };

export const login = createAsyncThunk('auth/login', (data: { email: string; password: string }) => authApi.login(data.email, data.password));

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      storage.remove(AUTH_TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: AuthUser }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        storage.set(AUTH_TOKEN_KEY, action.payload.token);
      })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Login failed'; });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
