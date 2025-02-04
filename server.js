const express = require('express');
const http = require("http");
const { ordersByCustomerId } = require('./constants/orders');

const app = express();
const PORT = 3005;

const server = http.createServer(app);
const io = require("socket.io")(server, {
    transports: ['websocket']  // Force WebSocket transport
  }); // Initialize Socket.io and attach to HTTP server

// Setup WebSocket
const orderNamespace = io.of('/orders');

orderNamespace.on("connection", async (socket) => {
    console.log("Client connected to orders namespace");

    socket.on('subscribeToCustomer', (customerId) => {
        socket.rooms.forEach(room => {
            if (room !== socket.id) {
                socket.leave(room);
            }
        });
        
        const room = `customer:${customerId}`;
        socket.join(room);
        console.log(`Client subscribed to customer ${customerId}`);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected from orders namespace");
    });
});

const emitOrderUpdate = (customerId, orderId, status) => {
  const room = `customer:${customerId}`;
  orderNamespace.to(room).emit('messageFromServer', { orderId, status });
}

// Middleware
app.use(express.json()); // Parse JSON request body

// API endpoints
app.post('/api/order-update', (req, res) => {
    const { customerId, orderId, status } = req.body;
    ordersByCustomerId[customerId].find(order => order.order_id === orderId).status = status;
    emitOrderUpdate(customerId, orderId, status);
    res.json({ success: true });
});
app.get('/api/get-orders/:customerId', (req, res) => {
    const { customerId } = req.params;
    const customerOrders = ordersByCustomerId[customerId];
    return res.json({ success: true, customerOrders });
});

// Start the server using the http server instance
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

