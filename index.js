const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db.config');
const Hotel = require('./models/hotel.model');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api',require('./routes/hotel.routes'));

app.get('/',(req,res)=>{
    res.json({message:'Welcome to Hotel Management System'});
})

const PORT = process.env.PORT || 3000;
sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port number ${PORT}.`);
    });
});