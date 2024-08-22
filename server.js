const express = require('express');
const connectDb = require('./config/db');
require('dotenv').config(); 

connectDb();

const app = express();

app.use(express.json());

app.use('/api/auth', require('./router/authRoutes'));
app.use('/api/user', require('./router/userRoutes'));
app.use('https://www.themealdb.com/api/json/v1/1',require('./router/Reciperoutes')); 


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
