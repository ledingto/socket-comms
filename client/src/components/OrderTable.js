import React from 'react';
import './OrderTable.css';

function OrderTable({ orders = [] }) {
  if (!orders.length) {
    return <p>No orders found.</p>;
  }

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.order_id}>
            <td>{order.order_id}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable; 