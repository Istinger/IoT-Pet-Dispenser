import express from 'express';
import {
	createSensorData,
	getAllSensorData,
	getLatestByDevice,
	getSensorById,
	updateSensorById,
	deleteSensorById,
	createSensorCommand,
	getLatestCommandByDevice,
	updateCommandStatus,
	reportSensorStatus,
	getCommandForDevice,
	completeCommand,
	getCommandById
} from '../controllers/sensorController.js';

const sensorRouter = express.Router();

// ===== ARDUINO ENDPOINTS =====

// POST - Arduino reports status (pir, ir, weight, servo state)
sensorRouter.post('/status', reportSensorStatus);

// POST - Arduino fetches pending command
sensorRouter.post('/command', getCommandForDevice);

// PATCH - Arduino marks command as completed
sensorRouter.patch('/command/:commandId/complete', completeCommand);

// ===== REST API ENDPOINTS =====

// POST - Create sensor data
sensorRouter.post('/', createSensorData);

// GET - Retrieve all sensor data
sensorRouter.get('/', getAllSensorData);

// GET - Retrieve latest sensor data by deviceId
sensorRouter.get('/device/:deviceId/latest', getLatestByDevice);

// COMMANDS - Create a dispense command
sensorRouter.post('/commands', createSensorCommand);

// COMMANDS - Get latest pending command for a device
sensorRouter.get('/commands/device/:deviceId/latest', getLatestCommandByDevice);

// COMMANDS - Update command status
sensorRouter.patch('/commands/:id', updateCommandStatus);

// COMMANDS - Get specific command by ID
sensorRouter.get('/commands/:commandId', getCommandById);

// GET - Retrieve sensor data by id
sensorRouter.get('/:id', getSensorById);

// PATCH - Update sensor data by id
sensorRouter.patch('/:id', updateSensorById);

// DELETE - Delete sensor data by id
sensorRouter.delete('/:id', deleteSensorById);

export default sensorRouter;