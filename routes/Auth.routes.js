import { Router } from "express";
import { signUp ,signIn } from "../controllers/auth.controller.js";


const Auth = Router();

Auth.post ('/sign-up', signUp );
Auth.post ('/sign-In', signIn );

export default Auth;