require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//Crear servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y Parse del Body
app.use(express.json());


//Base de Datos
dbConnection();


//Rutas
app.use('/api/v1/users',require('./routes/users.routes'));
app.use('/api/v1/login',require('./routes/auth.routes'));


app.listen(process.env.PORT, () => {
    console.log('Server Running in PORT ' + process.env.PORT);
});