import express, { json } from 'express'
import {PORT} from './config/env.js'
import dbConncetion from './database/mongodb.js'
import loggerMiddleware from './middleware/logger.js'
import  errorMiddleware from './middleware/middleware.js'
import  cookieParser from 'cookie-parser'
const app = express();



app.use(express.json());
// app.use(express.urlencoded({extends:false}))
app.use (cookieParser())


import Auth from './routes/Auth.routes.js'
import subscribtion from './routes/subscribtion.routes.js'
import user from './routes/user.routes.js'



app.use('/api/v1/user',loggerMiddleware, user);
app.use('/api/v1/subscribtion' , subscribtion)  
app.use('/api/v1/Auth', Auth);

app.use(errorMiddleware);

app.get ('/', (req,res)=>{
    res.send('hi world ')
})


app.listen(PORT, async() => {
    await dbConncetion();
  console.log(`Server running on port ${PORT}`);
  console.log("db connected");
});