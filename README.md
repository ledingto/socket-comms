## Purpose

The goal of this app is to test the ability of the frontend to render updated data from the backend sent via a websocket connection. It tests the ability for multiple clients to connect to the same websocket server and receive only the relevant updates.

Reminder: this app is a simple proof of concept, and the implementation details do not reflect a real-world or end-to-end environment.

## Technology Choices

- React
- Node.js
- Express
- Socket.io

## Steps to run locally

### Backend Server
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the server

### Frontend Client
1. Change directory to "client/"
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the server
4. Visit `http://localhost:3000` to view the app. You will see 3 clients, each with a unique customer ID and a table of their orders.

Create a POST request to the backend to simulate that an order status has updated and to see the new status reflect in realtime ONLY for the specific client for that order. For the request data, reference the ./constants/orders.js file. There is currently no sanitization or normalization of the request data.
```
curl -X POST http://localhost:3005/api/order-update \
  -H 'Content-Type: application/json' \
  -d '{"customerId": "123", "orderId": "some-order-id-1", "status": "shipped"}'
```

The different clients create the opportunity to simulate two different scenarios:
1. When the customerId is the same, the simulation represents different devices for the same customer, for example, both a desktop and a mobile app.
2. When the customerId is unique for each client, the simulation represents different customers with unique orders who will NOT receive updates for each other.
