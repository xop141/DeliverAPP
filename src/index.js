
import express from 'express';
import userRoute from '../src/route/userRoute.js'
import foodRoute from '../src/route/foodRoute.js'
import category from '../src/route/category.js'
import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://xopt0:MOLko911@cluster0.7lbwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  

const app = express();
const port = 3001;

app.use(express.json());

app.use('/user', userRoute)
app.use('/food', foodRoute, )
app.use('/category', category)


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

