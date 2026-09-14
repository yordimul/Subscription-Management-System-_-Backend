import mongoose from 'mongoose'

import {DATABASE_URI } from '../config/env.js'


const dbConncetion = async ()=>{
   await mongoose.connect(DATABASE_URI);
   console.log("SUCESS")
   
}
export default dbConncetion;