import React, { useRef, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PanToolIcon from '@mui/icons-material/PanTool'; // Raised hand
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined'; // Hand not raised (or a subtle version)

function Peer({
  isSelf,
  peerId,
  peerData,
  stream,
  toggleMuted,
  muted,
  toggleRaiseHand,
  raisedHand,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isSelf && stream) {
        // Self video uses MediaStream
        videoRef.current.srcObject = stream;
      } else if (!isSelf && peerData?.video?.src) {
        // Remote or "fake" peer uses a file path
        videoRef.current.src = peerData.video.src;
      }
    }
  }, [isSelf, stream, peerData]);

  return (
    <Stack
      spacing={0}
      sx={{
        width: '100%',
        height: '100%',
        border: '2px solid white',
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
          loop={!isSelf}
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#333',
            transform: isSelf ? 'scaleX(-1)' : 'none', // Mirror effect for self-view
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Bottom bar with mute toggle button */}
      <Box
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          textAlign: 'center',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={() => {
            toggleMuted(peerId);
          }}
        >
          {muted ? (
            <VolumeOffIcon sx={{ color: 'white' }} />
          ) : (
            <VolumeUpIcon sx={{ color: 'white' }} />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            toggleRaiseHand(peerId);
          }}
        >
          {raisedHand ? (
            <PanToolIcon sx={{ color: 'red' }} />
          ) : (
            <PanToolOutlinedIcon sx={{ color: 'white' }} />
          )}
        </IconButton>
      </Box>
    </Stack>
  );
}

export default Peer;
