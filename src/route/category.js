// routes/userRoute.js

import express from 'express';
import category from "../controlz/category/get-category.js"
import postcategory from '../controlz/category/post-category.js'

const route = express.Router();

route.get('/:category', category );
route.post("/postCategory", postcategory )

export default route;
