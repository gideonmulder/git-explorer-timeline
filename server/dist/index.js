"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Serve the static files from the Vite build
app.use(express_1.default.static(path_1.default.join(__dirname, '../../app/dist')));
// API routes
app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello from the backend!' });
});
// Handle all other routes and serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../app/dist/index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
