import { Router } from "express";


const Auth = Router();

Auth.get ('/', (req,res)=>{
    res.send('auth')
})

export default Auth;