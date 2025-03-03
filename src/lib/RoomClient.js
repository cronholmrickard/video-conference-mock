import { random } from 'pokemon';
import logger from '../utils/logger';
import StreamHandler from './StreamHandler';
import store from '../store/store';
import { setUserId, setRoomId } from '../store/slices/userSlice';
import { addMember, removeMember } from '../store/slices/memberSlice';
import { addPeer, removePeer } from '../store/slices/roomSlice';

class RoomClient {
  constructor() {
    logger.info('RoomClient initialized');
    this.streamHandler = new StreamHandler();
    this.userId = null;
    this.roomId = null;
  }

  async joinRoom(roomId) {
    try {
      this.roomId = roomId;
      store.dispatch(setRoomId(roomId));
      const userId = random();
      this.userId = userId;
      logger.info(`${userId} joining room ${roomId}`);
      store.dispatch(setUserId(userId));
      store.dispatch(addMember());
      store.dispatch(
        addPeer({ peerId: userId, kind: 'video', data: { src: null } }),
      );
      await this.streamHandler.start();
      logger.info('Stream started');
    } catch (err) {
      logger.error('Error starting stream:', err);
    }
  }

  leaveRoom() {
    logger.info('Leaving room');
    store.dispatch(removeMember());
    store.dispatch(removePeer({ peerId: this.userId }));
    this.streamHandler.stop();
    logger.info('Stream stopped');
  }

  destroy() {
    this.streamHandler.destroy();
    this.streamHandler = null;
    this.roomId = null;
  }
}

export default RoomClient;
