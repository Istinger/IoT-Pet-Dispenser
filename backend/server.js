import express  from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import sensorsRouter from './routes/sensorRoute.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import petRouter from './routes/petRouter.js';
import scheduleRouter from './routes/scheduleRoute.js';
import notificationRouter from './routes/notificationRoute.js';
import connectCloudinary from './config/cloudinary.js';
import { startScheduleProcessor } from './services/scheduleProcessor.js';

//App config
const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//DB config
connectDB();
connectCloudinary();

app.use(express.json());//request parsed to json
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/sensors',sensorsRouter)
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/pets',petRouter)
app.use('/api/schedules',scheduleRouter)
app.use('/api/notifications',notificationRouter)

app.get('/', (req, res) => {
    res.send('API WORKING');
});

//start express server

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  
  // Iniciar procesador de schedules (ejecuta cada minuto)
  startScheduleProcessor(60000);
});
