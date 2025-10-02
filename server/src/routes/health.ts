import { Express } from "express";

export default function configureApiHealth(app: Express){
    app.get('/api/health', (req, res) => {
        res.send({ message: 'Hello from the backend!' });
    });
}