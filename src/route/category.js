// routes/userRoute.js

import express from 'express';
import category from "../controlz/category/get-category.js"


const route = express.Router();

route.get('/:category', category );


export default route;
