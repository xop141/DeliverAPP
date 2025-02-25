// routes/userRoute.js

import express from 'express';
import { postUser } from '../controlz/account/post-user.js';  
import { getUser } from '../controlz/account/get-user.js';

const route = express.Router();

route.post('/signup', postUser);
route.get('/login', getUser)

export default route;
