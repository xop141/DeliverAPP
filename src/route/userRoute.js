// routes/userRoute.js

import express from 'express';
import { postUser } from '../controlz/account/post-user.js';  
import getUser from '../controlz/account/get-user.js'
import { deleteUser } from '../controlz/account/delete-user.js';
import verifyToken from '../middleware/authorization.js';
import cors from 'cors'
const app = express()
    app.use(cors())
const route = express.Router();

route.post('/signup',  postUser);
route.post('/login', getUser)

route.delete('/delete', deleteUser )

export default route;
