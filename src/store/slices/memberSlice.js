import { createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    memberCount: 0,
  },
  reducers: {
    addMember: (state) => {
      state.memberCount += 1;
    },
    removeMember: (state) => {
      state.memberCount -= 1;
    },
  },
});

export const { addMember, removeMember } = memberSlice.actions;

export default memberSlice.reducer;
