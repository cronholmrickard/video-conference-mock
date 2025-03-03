import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { withRoomContext } from '../lib/RoomClientContext';
import Peer from './Peer';

function Peers({ roomClient }) {
  const { userId } = useSelector((state) => state.user);
  const { peers } = useSelector((state) => state.room);
  const { peersMuted, raisedHands } = useSelector((state) => state.member);

  const toggleMuted = (peerId) => {
    roomClient.toggleMutePeer(peerId);
  };

  const toggleRaiseHand = (peerId) => {
    roomClient.toggleRaiseHand(peerId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {/* Outer container (80vw x 80vh) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
          gridTemplateRows: 'repeat(2, 1fr)', // 2 rows
          width: '80vw',
          height: '80vh',
          backgroundColor: 'red',
          p: 2,
          borderRadius: 2,
          gap: 2, // spacing between grid cells
        }}
      >
        {Object.entries(peers).map(([peerId, peerData]) => (
          <Box key={peerId} sx={{ width: '100%', height: '100%' }}>
            <Peer
              peerId={peerId}
              isSelf={userId === peerId}
              peerData={peerData}
              stream={
                userId === peerId ? roomClient.streamHandler.stream : null
              }
              toggleMuted={toggleMuted}
              muted={peersMuted[peerId]}
              toggleRaiseHand={toggleRaiseHand}
              raisedHand={raisedHands[peerId]}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default withRoomContext(Peers);
