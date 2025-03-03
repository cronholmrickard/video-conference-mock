import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    peers: {},
  },
  reducers: {
    addPeer: (state, action) => {
      let updatedPeers = {
        ...state.peers,
        [action.payload.peerId]: {
          ...state.peers[action.payload.peerId],
          [action.payload.kind]: action.payload.data,
        },
      };
      state.peers = updatedPeers;
      console.log('state.peers:', state.peers);
    },
    removePeer: (state, action) => {
      let updatedPeers = { ...state.peers };
      delete updatedPeers[action.payload.peerId];
      state.peers = updatedPeers;
    },
  },
});

export const { addPeer, removePeer } = roomSlice.actions;

export default roomSlice.reducer;
