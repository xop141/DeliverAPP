
import express from 'express';
import userRoute from '../src/route/userRoute.js'
import User from './model/usermodel.js';
import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://xopt0:MOLko911@cluster0.7lbwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  

const app = express();
const port = 3001;

app.use(express.json());

app.use('/user', userRoute)


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// import express from 'express'
// import mongoose from 'mongoose'
// import User from './model/usermodel.js'
// mongoose.connect("mongodb+srv://xopt0:MOLko911@cluster0.7lbwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


// const app = express()
// const port = 3001




// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })