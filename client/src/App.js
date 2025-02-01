import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import OrderTable from './components/OrderTable';

// Create socket connection outside component
const socket = io("http://localhost:3005", {
  transports: ['websocket']
});

function App() {
  const [status, setStatus] = useState('initial');

  useEffect(() => {
    console.log('Setting up socket listener');

    socket.on('messageFromServer', (data) => {
      console.log("RECEIVED MESSAGE")
      setStatus(data);
    });

    return () => {
      console.log('Removing socket listener');
      socket.off('messageFromServer');
    };
  }, []);

  return (
    <div className="App">
      <h1>WebSocket with Socket.io</h1>
      <OrderTable status={status} />
    </div>
  );
}

export default App;
