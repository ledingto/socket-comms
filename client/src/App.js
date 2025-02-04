import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import OrderTable from './components/OrderTable';
import './App.css';

const SOCKET_URL = "http://localhost:3005/orders";
const API_BASE_URL = "/api";

/* Reusable client component that handles it's own socket connection to
 * simulate multiple customers receiving updates from the server
 */
function Client({ customerId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // FETCH ORDERS
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-orders/${customerId}`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.customerOrders);
        }
      } catch (error) {
        console.error(`Error fetching orders for Client ${customerId}:`, error);
      }
    };
    fetchOrders();

    // SOCKET CONNECTION FOR UPDATES
    const socket = io(SOCKET_URL, {
      transports: ['websocket']
    });

    const handleConnect = () => {
      console.log(`Client ${customerId} connected`);
      socket.emit('subscribeToCustomer', customerId);
    };

    const handleOrderUpdate = (data) => {
      console.log(`Client ${customerId} received update:`, data);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.order_id === data.orderId
            ? { ...order, status: data.status }
            : order
        )
      );
    };

    const handleError = (error) => {
      console.error(`Client ${customerId} socket error:`, error);
    };

    // Set up all event listeners
    socket.on('connect', handleConnect);
    socket.on('messageFromServer', handleOrderUpdate);
    socket.on('error', handleError);

    // Clean up connections and listeners
    return () => {
      if (socket) {
        socket.off('messageFromServer');
        socket.off('error');
        socket.off('connect');
      }

      socket.emit('unsubscribeFromCustomer', customerId);
      socket.disconnect();
    };
  }, [customerId]);

  return (
    <>
      <p>Customer ID: {customerId}</p>
      <OrderTable orders={orders} />
    </>
  )
}

function App() {
  return (
    <div className="container">
      <h1>WebSocket with Socket.io</h1>
      <Client customerId="123" />
      <Client customerId="456" />
      <Client customerId="789" />
    </div>
  );
}

export default App;
