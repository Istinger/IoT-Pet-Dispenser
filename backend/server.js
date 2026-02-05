import express  from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import sensorsRouter from './routes/sensorRoute.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//App config
const app = express();
const port = process.env.PORT || 4000;
//DB config
connectDB();

app.use(express.json());//request parsed to json
app.use(cors());

app.use('/api/sensors',sensorsRouter)
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)

app.get('/', (req, res) => {
    res.send('API WORKING');
});

//start express server

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
