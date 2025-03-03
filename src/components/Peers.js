import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { withRoomContext } from '../lib/RoomClientContext';
import Peer from './Peer';

function Peers({ roomClient }) {
  const { userId } = useSelector((state) => state.user);
  const { peers } = useSelector((state) => state.room);
  const { memberCount } = useSelector((state) => state.member);
  const gridSize = memberCount > 1 ? 12 : 6;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: 'black',
          padding: 2,
          borderRadius: 2,
          width: '80vw',
          height: '80vh',
        }}
      >
        {Object.entries(peers).map(([peerId, peerData]) => (
          <Grid item xs={gridSize} key={peerId}>
            <Peer
              peerId={peerId}
              isSelf={userId === peerId}
              peerData={peerData}
              roomClient={roomClient}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default withRoomContext(Peers);
