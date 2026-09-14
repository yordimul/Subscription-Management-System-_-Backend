import { Router } from "express";


const subscribtion = Router();

subscribtion.get ('/', (req,res)=>{
    res.send('subscribtion')
})

export default subscribtion;