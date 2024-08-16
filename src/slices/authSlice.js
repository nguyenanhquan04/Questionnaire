import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { role: 'intern' }, // Can be 'intern' or 'admin'
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = authSlice.actions;
export default authSlice.reducer;
