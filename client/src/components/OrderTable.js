import React from 'react';

function OrderTable({ status }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Item Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>123456</td>
          <td>Item 1</td>
          <td>{status}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default OrderTable; 