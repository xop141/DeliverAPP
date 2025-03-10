// routes/userRoute.js

import express from 'express';
import { postFood } from '../controlz/food/post-food.js';  
import { deleteFood } from '../controlz/food/delete-food.js';
import { patchFood } from '../controlz/food/patch-food.js';

const route = express.Router();

route.post('/foodADD', postFood );
route.delete('/foodDelete' ,deleteFood)
route.patch('/patchFOOD/:foodID', patchFood)
export default route;
