import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { withRoomContext } from '../lib/RoomClientContext';
import Peers from '../components/Peers';

function VideoRoom({ roomClient }) {
  const { roomId } = useParams();
  useEffect(() => {
    if (!roomId) return;
    (async () => {
      roomClient.joinRoom(roomId);
    })();
    return () => {
      roomClient.leaveRoom();
    };
  }, [roomClient]);

  return <Peers roomClient={roomClient} />;
}

const VideoRoomWrapper = ({ roomClient }) => {
  return <VideoRoom roomClient={roomClient} />;
};

export default withRoomContext(VideoRoomWrapper);
