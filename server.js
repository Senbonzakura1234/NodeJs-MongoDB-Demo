//Library import
const express = require('express');
const mongoose =  require('mongoose');
require('dotenv').config();

//Initiate express app
const app = express();
app.use(express.json());

//Router
const notesRouter = require('./routes/notesRouters');
app.use('/notes', notesRouter);

//Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', ()  => console.log('Database Connected'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running at port ${port}`));