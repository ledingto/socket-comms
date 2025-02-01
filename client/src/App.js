import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

// Create socket connection outside component
const socket = io("http://localhost:3005", {
  transports: ['websocket']
});

function App() {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    // Set up event listener
    socket.on('messageFromServer', (data) => {
      console.log("RECEIVED MESSAGE")
      setMessage(data);
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off('messageFromServer');
    };
  }, []); // Empty dependency array means this only runs once on mount

  const sendMessage = () => {
    socket.emit('messageFromClient', input);
  };

  return (
    <div className="App">
      <h1>WebSocket with Socket.io</h1>
      <p>{message}</p>
      <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send Message to Server</button>
    </div>
  );
}

export default App;
