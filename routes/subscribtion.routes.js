import { Router } from "express";
import userMiddlewar from './../middleware/userMiddleware.js'
import {createSubscription} from './../controllers/subscribtion.controller.js'



const subscribtion = Router();

subscribtion.post ('/Create', userMiddlewar, createSubscription)

export default subscribtion;