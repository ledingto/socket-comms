const express = require('express');
const http = require("http");

const app = express();
const PORT = 3005;

const server = http.createServer(app);
const io = require("socket.io")(server, {
    transports: ['websocket']  // Force WebSocket transport
  }); // Initialize Socket.io and attach to HTTP server

// Handle WebSocket connection
io.on("connection", async (socket) => {
    console.log("connected");

    socket.emit('messageFromServer', "pending");
    await wait();

    socket.emit('messageFromServer', "payment succeeded");
    await wait();

    socket.emit('messageFromServer', "shipped");
    await wait();

    socket.emit('messageFromServer', "complete");

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

function wait(ms = 3000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

