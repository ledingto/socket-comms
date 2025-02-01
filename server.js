const express = require('express');
const http = require("http");

const app = express();
const PORT = 3005;

const server = http.createServer(app);
const io = require("socket.io")(server, {
    transports: ['websocket']  // Force WebSocket transport
  }); // Initialize Socket.io and attach to HTTP server

// Handle WebSocket connection
io.on("connection", (socket) => {
    console.log("connected");

    socket.on('messageFromClient', (data) => {
        console.log('Received from client:', data);
        socket.emit('messageFromServer', 'Hello from the server!');
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });


// Middleware
app.use(express.json()); // Parse JSON request body

// Start the server using the http server instance
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

