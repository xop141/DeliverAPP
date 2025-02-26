// routes/userRoute.js

import express from 'express';
import { postFood } from '../controlz/food/post-food.js';  
import { deleteFood } from '../controlz/food/delete-food.js';
// import { getUser } from '../controlz/account/get-user.js';

const route = express.Router();

route.post('/foodADD', postFood );
route.delete('/foodDelete' ,deleteFood)

export default route;
