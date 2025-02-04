import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import OrderTable from './components/OrderTable';
import './App.css';

const SOCKET_URL = "http://localhost:3005/orders";
const API_BASE_URL = "/api";

const socket = io(SOCKET_URL, {
  transports: ['websocket']
});

function App() {
  const [orders, setOrders] = useState([]);
  const CUSTOMER_ID = "123"; // In real app, this would come from authorization

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-orders/${CUSTOMER_ID}`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.customerOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();

    // Subscribe to customer updates
    console.log("Subscribing to customer updates");
    socket.emit('subscribeToCustomer', CUSTOMER_ID);
    
    // Add listener for order updates
    socket.on('messageFromServer', (data) => {
      console.log("Received order update:", data);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.order_id === data.orderId
            ? { ...order, status: data.status }
            : order
        )
      );
    });

    return () => {
      socket.off('messageFromServer');
    };
  }, []);

  return (
    <div className="container">
      <h1>WebSocket with Socket.io</h1>
      <p>Customer ID: {CUSTOMER_ID}</p>
      <OrderTable orders={orders} />
    </div>
  );
}

export default App;
