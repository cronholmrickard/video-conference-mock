import React from 'react';
import { useParams } from 'react-router-dom';
import { withRoomContext } from '../lib/RoomClientContext';

function VideoRoom() {
  const { roomId } = useParams();
  return <div>{roomId}</div>;
}

const VideoRoomWrapper = ({ roomClient }) => {
  return <VideoRoom roomClient={roomClient} />;
};

export default withRoomContext(VideoRoomWrapper);
