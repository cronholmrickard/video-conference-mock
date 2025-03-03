import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import memberReducer from './slices/memberSlice';
import roomReducer from './slices/roomSlice';

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['room/addPeer', 'member/togglePeerMuted'],
        // Ignore these paths in the state
        ignoredPaths: ['room.peers', 'member.peersMuted'],
      },
    }),
  reducer: {
    user: userReducer,
    member: memberReducer,
    room: roomReducer,
  },
});
