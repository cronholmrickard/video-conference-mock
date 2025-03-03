import { createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    members: [],
    raisedHands: {},
    peersMuted: {},
    memberCount: 0,
  },
  reducers: {
    addMember: (state, action) => {
      state.members.push(action.payload);
      state.memberCount += 1;
    },
    removeMember: (state, action) => {
      state.members = state.members.filter(
        (member) => member !== action.payload,
      );
      state.memberCount -= 1;
    },
    togglePeerMuted: (state, action) => {
      const peerId = action.payload;
      // If the key doesn't exist, default to false
      const currentValue = state.peersMuted[peerId] ?? false;
      state.peersMuted[peerId] = !currentValue;
    },
    toggleRaiseHand: (state, action) => {
      const peerId = action.payload;
      // If the key doesn't exist, default to false
      const currentValue = state.raisedHands[peerId] ?? false;
      state.raisedHands[peerId] = !currentValue;
    },
  },
});

export const { addMember, removeMember, togglePeerMuted, toggleRaiseHand } =
  memberSlice.actions;

export default memberSlice.reducer;
