const express = require('express');

const app = express();
const PORT = 3005;

// Middleware
app.use(express.json()); // Parse JSON request body

// Sample API endpoint
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

