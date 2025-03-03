import React, { useRef, useEffect } from 'react';
import Stack from '@mui/material/Stack';

function Peer({ isSelf, peerId, peerData, roomClient }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isSelf && videoRef.current && roomClient?.streamHandler?.stream) {
      videoRef.current.srcObject = roomClient.streamHandler.stream;
    }
  }, [isSelf, roomClient]);

  return (
    <Stack
      spacing={0}
      sx={{
        border: '2px solid red',
        borderRadius: 2,
        overflow: 'hidden',
        width: '100%', // Container width is relative to its parent
      }}
    >
      {/* Top blue bar with peerId */}
      <Stack
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          padding: 1,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
        }}
      >
        {peerId}
      </Stack>
      {/* Responsive video feed container maintaining a 4:3 aspect ratio */}
      <Stack
        sx={{
          position: 'relative',
          width: '100%', // Fills parent's width
          paddingTop: '75%', // 480/640 = 0.75 (75%) to maintain a 4:3 aspect ratio
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
            width: '100%', // Fills the container's width
            height: '100%', // Fills the container's height
            background: '#333',
            transform: 'scaleX(-1)', // Mirror effect for self-view
          }}
        />
      </Stack>
    </Stack>
  );
}

export default Peer;
