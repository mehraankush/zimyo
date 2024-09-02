import express from 'express';
import cors from 'cors';
import path , { dirname } from 'node:path'
import { fileURLToPath } from 'url';


import routes from './routes/index.js'

const app = express();
const PORT = process.env.PORT || 4000

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "*"
        ],
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', routes)

app.listen(PORT, () => {
    console.log('Server started on port',PORT)
});


