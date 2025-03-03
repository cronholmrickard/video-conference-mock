import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    roomId: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { setUserId, setRoomId } = userSlice.actions;

export default userSlice.reducer;
