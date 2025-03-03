import React, { useRef, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function Peer({ isSelf, peerId, peerData, roomClient }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isSelf && roomClient?.streamHandler?.stream) {
        // Self video uses MediaStream
        videoRef.current.srcObject = roomClient.streamHandler.stream;
      } else if (!isSelf && peerData?.video?.src) {
        // Remote or "fake" peer uses file path
        videoRef.current.src = peerData.video.src;
        console.log('Peer video src:', peerData.video.src);
      }
    }
  }, [isSelf, roomClient, peerData]);

  return (
    <Stack
      spacing={0}
      sx={{
        width: '100%',
        height: '100%',
        border: '2px solid red',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          p: 1,
        }}
      >
        {peerId}
      </Box>

      {/* Video area fills remaining space */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted={isSelf}
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#333',
            transform: isSelf ? 'scaleX(-1)' : 'none', // Mirror self
            objectFit: 'cover', // or 'contain', depending on preference
          }}
        />
      </Box>
    </Stack>
  );
}

export default Peer;
