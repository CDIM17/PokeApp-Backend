require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//Create Express Server
const app = express();

//Setting CORS
app.use(cors());

//Read and Parse Body
app.use(express.json());


//Database Connection
dbConnection();


//Routes
app.use('/api/v1/users',require('./routes/users.routes'));
app.use('/api/v1/login',require('./routes/auth.routes'));


app.listen(process.env.PORT, () => {
    console.log('Server Running in PORT ' + process.env.PORT);
});