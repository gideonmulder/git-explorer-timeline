import express from 'express';
import path from 'path';
import configureApiHealth from './routes/health';
import configureApiGitRepo from './routes/gitrepo';

const app = express();
const port = process.env.PORT || 5000;

// Serve the static files from the Vite build
app.use(express.static(path.join(__dirname, '../../app/dist')));

// API routes
configureApiHealth(app);
configureApiGitRepo(app);

// Handle all other routes and serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../app/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
