const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/users.routes');
const personalInfoRoutes = require('./routes/personal.info.routes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Route handler for the root ("/")
app.get('/', (req, res) => {
    res.send('Hello, welcome to the backend!');
});

app.use(userRoutes);
app.use(personalInfoRoutes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    });
});

app.listen(4000, () => {
    console.log('Server on port 4000');
});




