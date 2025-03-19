// routes/userRoute.js

import express from 'express';

import postcategory from '../controlz/category/post-category.js'
import category from '../controlz/category/get-category.js';

const route = express.Router();

// route.get('/:category', category );
route.post("/add", postcategory );
route.get('/', category)

export default route;
