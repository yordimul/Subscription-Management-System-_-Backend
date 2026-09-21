import { Router } from "express";
import {FindAllUsers , FindUser} from './../controllers/user.controller.js'

import userMiddlewar from './../middleware/userMiddleware.js'


const user = Router();

user.get ('/users',userMiddlewar, FindAllUsers );
user.get ('/:id',userMiddlewar, FindUser );

export default user;