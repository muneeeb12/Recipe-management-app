const express = require('express');
const connectDb = require('./config/db');
require('dotenv').config(); 

connectDb();

const app = express();

app.use(express.json());

const authRoutes = require('./router/authRoutes');

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
