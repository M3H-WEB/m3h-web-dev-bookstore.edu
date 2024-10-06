// const express = require('express')
// const dotenv = require('dotenv')

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';
import cartRoute from './route/cart.route.js';
import otpRoute from './route/otpsend.route.js';
import ansRoute from './route/securityQuestion.route.js';
import cors from 'cors';
import path from 'path';
const app = express()

app.use(cors());
app.use(express.json())
dotenv.config()
app.use(express.static('uploads'))
const port = process.env.PORT || 4000;
const URL = process.env.MongoDBURL;

try {
    mongoose.connect(URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    console.log('connected to mongoDB')
} catch (error) {
    console.log('Error:', error)
}


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

//defining routes
app.use('/book', bookRoute);
app.use('/user', userRoute);
app.use('/cart', cartRoute);
app.use('/auth', otpRoute);
app.use('/auth', ansRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})