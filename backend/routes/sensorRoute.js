import express from 'express';
import { sensorData, getAllSensorData, getLatestByDevice } from '../controllers/sensorController.js';

const sensorRouter = express.Router();

// POST - Receive sensor data from device
sensorRouter.post('/', sensorData);

// GET - Retrieve all sensor data
sensorRouter.get('/', getAllSensorData);

// GET - Retrieve latest sensor data by deviceId
sensorRouter.get('/device/:deviceId', getLatestByDevice);

export default sensorRouter;