import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Group, User } from '../../shared/types/domain';
import { managementApi } from '../../shared/api/managementApi';
interface ManagementState {
  groups: Group[];
  users: User[];
  loading: boolean;
  error: string | null;
}
const initialState: ManagementState = { groups: [], users: [], loading: false, error: null };
export const fetchGroups = createAsyncThunk('management/groups', () => managementApi.groups.list());
export const createGroup = createAsyncThunk('management/createGroup', (data: Omit<Group, 'id'>) =>
  managementApi.groups.create(data),
);
export const updateGroup = createAsyncThunk(
  'management/updateGroup',
  ({ id, data }: { id: number; data: Partial<Group> }) => managementApi.groups.update(id, data),
);
export const deleteGroup = createAsyncThunk('management/deleteGroup', (id: number) =>
  managementApi.groups.remove(id).then(() => id),
);
export const fetchUsers = createAsyncThunk('management/users', () => managementApi.users.list());
export const createUser = createAsyncThunk('management/createUser', (data: Omit<User, 'id'>) =>
  managementApi.users.create(data),
);
export const updateUser = createAsyncThunk(
  'management/updateUser',
  ({ id, data }: { id: number; data: Partial<User> }) => managementApi.users.update(id, data),
);
export const deleteUser = createAsyncThunk('management/deleteUser', (id: number) =>
  managementApi.users.remove(id).then(() => id),
);
const slice = createSlice({
  name: 'management',
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        const index = state.groups.findIndex((group) => group.id === action.payload.id);
        if (index >= 0) state.groups[index] = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index >= 0) state.users[index] = action.payload;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter((group) => group.id !== action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.startsWith('management/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.startsWith('management/') && action.type.endsWith('/rejected'),
        (state) => {
          state.loading = false;
          state.error = 'Не удалось выполнить операцию';
        },
      )
      .addMatcher(
        (action) => action.type.startsWith('management/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        },
      );
  },
});
export default slice.reducer;
