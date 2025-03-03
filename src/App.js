import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import RoomContext from './lib/RoomClientContext';
import RoomClient from './lib/RoomClient';
import VideoRoom from './views/VideoRoom';
import { random } from 'pokemon';

function RandomRoomRedirect() {
  const name = random();
  return <Navigate to={`/video/${name}`} replace />;
}

const roomClient = new RoomClient({});

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/video/:roomId'
            element={
              <RoomContext.Provider value={roomClient}>
                <VideoRoom />
              </RoomContext.Provider>
            }
          />
          <Route path='*' element={<RandomRoomRedirect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
