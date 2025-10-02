import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;

// Serve the static files from the Vite build
app.use(express.static(path.join(__dirname, '../../app/dist')));

// API routes
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});

// Handle all other routes and serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../app/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
