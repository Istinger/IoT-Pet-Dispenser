import sensorsModel from '../models/sensorsModel.js';
import sensorCommandModel from '../models/sensorCommandModel.js';

const toNumber = (value) => {
    if (value === null || value === undefined || value === '') return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
};

const toBoolean = (value) => {
    if (value === true || value === false) return value;
    if (value === 'true' || value === '1' || value === 1) return true;
    if (value === 'false' || value === '0' || value === 0) return false;
    return undefined;
};

const buildPayload = (body, includeDeviceId) => {
    const {
        deviceId,
        pir,
        ir,
        pesoComida,
        pesoAnimal,
        servoAngle,
        servoAbierto,
        dispensing,
        portionTarget,
        portionDelivered,
    } = body;

    const payload = {};
    if (includeDeviceId) payload.deviceId = deviceId;

    const pirValue = toBoolean(pir);
    const irValue = toBoolean(ir);
    const servoAbiertoValue = toBoolean(servoAbierto);
    const dispensingValue = toBoolean(dispensing);
    const pesoComidaValue = toNumber(pesoComida);
    const pesoAnimalValue = toNumber(pesoAnimal);
    const servoAngleValue = toNumber(servoAngle);
    const portionTargetValue = toNumber(portionTarget);
    const portionDeliveredValue = toNumber(portionDelivered);

    if (pirValue !== undefined) payload.pir = pirValue;
    if (irValue !== undefined) payload.ir = irValue;
    if (servoAbiertoValue !== undefined) payload.servoAbierto = servoAbiertoValue;
    if (dispensingValue !== undefined) payload.dispensing = dispensingValue;
    if (pesoComidaValue !== undefined) payload.pesoComida = pesoComidaValue;
    if (pesoAnimalValue !== undefined) payload.pesoAnimal = pesoAnimalValue;
    if (servoAngleValue !== undefined) payload.servoAngle = servoAngleValue;
    if (portionTargetValue !== undefined) payload.portionTarget = portionTargetValue;
    if (portionDeliveredValue !== undefined) payload.portionDelivered = portionDeliveredValue;

    return payload;
};

const MAX_FOOD_GRAMS = 1110;

// POST /api/sensors
const createSensorData = async (req, res) => {
    try {
        const { deviceId } = req.body;

        if (!deviceId) {
            return res.status(400).json({
                success: false,
                message: 'deviceId is required'
            });
        }

        const payload = buildPayload(req.body, true);

        const newSensorData = new sensorsModel(payload);
        await newSensorData.save();

        res.status(201).json({
            success: true,
            message: 'Sensor data created',
            data: newSensorData
        });
    } catch (error) {
        console.error('Error saving sensor data:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving sensor data',
            error: error.message
        });
    }
};

// Get all sensor data
// GET /api/sensors
const getAllSensorData = async (req, res) => {
    try {
        const sensorData = await sensorsModel.find().sort({ createdAt: -1 });
        res.status(200).json({ 
            success: true, 
            data: sensorData 
        });
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching sensor data',
            error: error.message 
        });
    }
};

// Get latest sensor data by deviceId
// GET /api/sensors/device/:deviceId/latest
const getLatestByDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const latestData = await sensorsModel.findOne({ deviceId }).sort({ createdAt: -1 });
        
        if (!latestData) {
            return res.status(404).json({ 
                success: false, 
                message: 'No data found for this device' 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            data: latestData 
        });
    } catch (error) {
        console.error('Error fetching latest sensor data:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching sensor data',
            error: error.message 
        });
    }
};

// GET /api/sensors/:id
const getSensorById = async (req, res) => {
    try {
        const { id } = req.params;
        const sensorData = await sensorsModel.findById(id);

        if (!sensorData) {
            return res.status(404).json({
                success: false,
                message: 'Sensor data not found'
            });
        }

        res.status(200).json({
            success: true,
            data: sensorData
        });
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching sensor data',
            error: error.message
        });
    }
};

// PATCH /api/sensors/:id
const updateSensorById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatePayload = buildPayload(req.body, false);

        if (Object.keys(updatePayload).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields to update'
            });
        }

        const updated = await sensorsModel.findByIdAndUpdate(id, updatePayload, { new: true });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Sensor data not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Sensor data updated',
            data: updated
        });
    } catch (error) {
        console.error('Error updating sensor data:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating sensor data',
            error: error.message
        });
    }
};

// POST /api/sensors/status (Arduino status report)
const reportSensorStatus = async (req, res) => {
    try {
        const { deviceId, pir, ir, pesoComida, servoAbierto } = req.body;

        if (!deviceId) {
            return res.status(400).json({
                success: false,
                message: 'deviceId is required'
            });
        }

        const payload = { deviceId };
        const pirValue = toBoolean(pir);
        const irValue = toBoolean(ir);
        const servoAbiertoValue = toBoolean(servoAbierto);
        const pesoComidaValue = toNumber(pesoComida);

        if (pirValue !== undefined) payload.pir = pirValue;
        if (irValue !== undefined) payload.ir = irValue;
        if (servoAbiertoValue !== undefined) payload.servoAbierto = servoAbiertoValue;
        if (pesoComidaValue !== undefined) payload.pesoComida = pesoComidaValue;

        const newStatus = new sensorsModel(payload);
        await newStatus.save();

        res.status(200).json({
            success: true,
            message: 'Status received',
            data: newStatus
        });
    } catch (error) {
        console.error('Error reporting status:', error);
        res.status(500).json({
            success: false,
            message: 'Error reporting status',
            error: error.message
        });
    }
};

// POST /api/sensors/command (Arduino fetches pending command)
const getCommandForDevice = async (req, res) => {
    try {
        const { deviceId } = req.body;

        if (!deviceId) {
            return res.status(200).json({
                dispense: false,
                portionTarget: 0
            });
        }

        const command = await sensorCommandModel.findOne({
            deviceId,
            status: { $in: ['pending', 'in_progress'] }
        }).sort({ createdAt: -1 });

        if (!command) {
            return res.status(200).json({
                dispense: false,
                portionTarget: 0
            });
        }

        // Update to in_progress if pending
        if (command.status === 'pending') {
            await sensorCommandModel.findByIdAndUpdate(
                command._id,
                { status: 'in_progress', updatedAt: new Date() },
                { new: true }
            );
        }

        res.status(200).json({
            dispense: command.dispense,
            portionTarget: command.portionTarget,
            commandId: command._id
        });
    } catch (error) {
        console.error('Error fetching command:', error);
        res.status(200).json({
            dispense: false,
            portionTarget: 0
        });
    }
};

// PATCH /api/sensors/command/:commandId/complete (Arduino marks as done)
const completeCommand = async (req, res) => {
    try {
        const { commandId } = req.params;

        const updated = await sensorCommandModel.findByIdAndUpdate(
            commandId,
            {
                status: 'completed',
                completedAt: new Date(),
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Command not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Command completed',
            data: updated
        });
    } catch (error) {
        console.error('Error completing command:', error);
        res.status(500).json({
            success: false,
            message: 'Error completing command',
            error: error.message
        });
    }
};

// DELETE /api/sensors/:id
const deleteSensorById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await sensorsModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Sensor data not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Sensor data deleted'
        });
    } catch (error) {
        console.error('Error deleting sensor data:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting sensor data',
            error: error.message
        });
    }
};

// POST /api/sensors/commands
const createSensorCommand = async (req, res) => {
    try {
        const { deviceId, dispense, portionTarget } = req.body;

        if (!deviceId) {
            return res.status(400).json({
                success: false,
                message: 'deviceId is required'
            });
        }

        const dispenseValue = toBoolean(dispense) ?? false;
        const portionTargetValue = toNumber(portionTarget) ?? 0;

        if (dispenseValue) {
            if (portionTargetValue <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'portionTarget must be greater than 0'
                });
            }

            if (portionTargetValue > MAX_FOOD_GRAMS) {
                return res.status(400).json({
                    success: false,
                    message: `portionTarget must be <= ${MAX_FOOD_GRAMS}`
                });
            }
        }

        const command = new sensorCommandModel({
            deviceId,
            dispense: dispenseValue,
            portionTarget: portionTargetValue,
            status: dispenseValue ? 'pending' : 'cancelled'
        });

        await command.save();

        res.status(201).json({
            success: true,
            message: 'Command created',
            data: command
        });
    } catch (error) {
        console.error('Error creating command:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating command',
            error: error.message
        });
    }
};

// GET /api/sensors/commands/device/:deviceId/latest
const getLatestCommandByDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const latestCommand = await sensorCommandModel
            .findOne({ deviceId, status: { $in: ['pending', 'in_progress'] } })
            .sort({ createdAt: -1 });

        if (!latestCommand) {
            return res.status(404).json({
                success: false,
                message: 'No pending command for this device'
            });
        }

        res.status(200).json({
            success: true,
            data: latestCommand
        });
    } catch (error) {
        console.error('Error fetching command:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching command',
            error: error.message
        });
    }
};

// PATCH /api/sensors/commands/:id
const updateCommandStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'status is required'
            });
        }

        const allowed = ['pending', 'in_progress', 'completed', 'cancelled'];
        if (!allowed.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `status must be one of: ${allowed.join(', ')}`
            });
        }

        const update = {
            status,
            updatedAt: new Date()
        };

        if (status === 'completed') {
            update.completedAt = new Date();
        }

        const updated = await sensorCommandModel.findByIdAndUpdate(id, update, { new: true });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Command not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Command updated',
            data: updated
        });
    } catch (error) {
        console.error('Error updating command:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating command',
            error: error.message
        });
    }
};

// GET /api/sensors/commands/:commandId
const getCommandById = async (req, res) => {
    try {
        const { commandId } = req.params;

        const command = await sensorCommandModel.findById(commandId);

        if (!command) {
            return res.status(404).json({
                success: false,
                message: 'Command not found'
            });
        }

        res.status(200).json({
            success: true,
            data: command
        });
    } catch (error) {
        console.error('Error fetching command:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching command',
            error: error.message
        });
    }
};

export {
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
};