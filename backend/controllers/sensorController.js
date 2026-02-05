import sensorsModel from '../models/sensorsModel.js';

const sensorData = async (req, res) => {
    try {
        const { deviceId, pir, button, temperature, humidity, led, servoAngle } = req.body;
        
        // Validate required fields
        if (!deviceId) {
            return res.status(400).json({ 
                success: false, 
                message: 'deviceId is required' 
            });
        }

        // Create new sensor data entry
        const newSensorData = new sensorsModel({
            deviceId,
            pir,
            button,
            temperature,
            humidity,
            led,
            servoAngle
        });

        // Save to database
        await newSensorData.save();
        
        console.log('Sensor data saved:', req.body);
        
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