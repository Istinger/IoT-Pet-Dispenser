import sensorsModel from '../models/sensorsModel.js';

const toNumber = (value) => {
    if (value === null || value === undefined || value === '') return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
};

const toBoolean = (value) => {
    if (value === true || value === false) return value;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
};

const sensorData = async (req, res) => {
    try {
        const {
            deviceId,
            pir,
            irProximity,
            weightAnimal,
            weightFood,
            servoAngle,
            dispensing,
            portionTarget,
            portionDelivered,
        } = req.body;

        // Validate required fields
        if (!deviceId) {
            return res.status(400).json({
                success: false,
                message: 'deviceId is required'
            });
        }

        const payload = { deviceId };
        const pirValue = toBoolean(pir);
        const irValue = toBoolean(irProximity);
        const dispensingValue = toBoolean(dispensing);
        const weightAnimalValue = toNumber(weightAnimal);
        const weightFoodValue = toNumber(weightFood);
        const servoAngleValue = toNumber(servoAngle);
        const portionTargetValue = toNumber(portionTarget);
        const portionDeliveredValue = toNumber(portionDelivered);

        if (pirValue !== undefined) payload.pir = pirValue;
        if (irValue !== undefined) payload.irProximity = irValue;
        if (dispensingValue !== undefined) payload.dispensing = dispensingValue;
        if (weightAnimalValue !== undefined) payload.weightAnimal = weightAnimalValue;
        if (weightFoodValue !== undefined) payload.weightFood = weightFoodValue;
        if (servoAngleValue !== undefined) payload.servoAngle = servoAngleValue;
        if (portionTargetValue !== undefined) payload.portionTarget = portionTargetValue;
        if (portionDeliveredValue !== undefined) payload.portionDelivered = portionDeliveredValue;

        // Create new sensor data entry
        const newSensorData = new sensorsModel(payload);

        // Save to database
        await newSensorData.save();

        console.log('Sensor data saved:', payload);

        res.status(200).json({
            success: true,
            message: 'Sensor data received and saved',
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

export { sensorData, getAllSensorData, getLatestByDevice };