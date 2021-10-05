const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());

//IMPORT ROUTES
const recordRoute = require('./routes/record');


//IMPORT MIDDLEWARES
const validate = require('./middleware/validate');

//INIT ROUTE
app.use('/records', validate, recordRoute);

//MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser : true , useUnifiedTopology: true})
    .then(() => console.log("MongoDB conected ..."))
    .catch(err => console.log(err));

//START SERVER
app.listen(process.env.PORT)