// routes/userRoute.js

import express from 'express';

import postcategory from '../controlz/category/post-category.js'
import category from '../controlz/category/category.js';
const route = express.Router();

// route.get('/:category', category );
route.post("/postCategory", postcategory );
route.get('/asd', category)
export default route;
