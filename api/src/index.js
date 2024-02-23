import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/users.routes.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, welcome to the backend!');
});

app.use(userRoutes);

app.use((err, req, res, next) => {
    res.json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});