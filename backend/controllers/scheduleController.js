import scheduleModel from "../models/scheduleModel.js";

const buildTimeString = (date = new Date()) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const createSchedule = async (req, res) => {
  try {
    const { userId, petId, deviceId, time, days, portionGrams, isActive } = req.body;

    if (!userId || !petId || !deviceId || !time || portionGrams === undefined) {
      return res.status(400).json({
        success: false,
        message: "userId, petId, deviceId, time, and portionGrams are required",
      });
    }

    const newSchedule = new scheduleModel({
      userId,
      petId,
      deviceId,
      time,
      days: Array.isArray(days) ? days : [],
      portionGrams: Number(portionGrams),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    const schedule = await newSchedule.save();

    res.status(201).json({
      success: true,
      message: "Schedule created",
      schedule,
    });
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({
      success: false,
      message: "Error creating schedule",
      error: error.message,
    });
  }
};

const getSchedulesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const schedules = await scheduleModel.find({ userId }).sort({ time: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching schedules",
      error: error.message,
    });
  }
};

const getSchedulesByPet = async (req, res) => {
  try {
    const { petId } = req.params;

    if (!petId) {
      return res.status(400).json({
        success: false,
        message: "petId is required",
      });
    }

    const schedules = await scheduleModel.find({ petId }).sort({ time: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching schedules",
      error: error.message,
    });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const { time, days, portionGrams, isActive, deviceId } = req.body;

    if (!scheduleId) {
      return res.status(400).json({
        success: false,
        message: "scheduleId is required",
      });
    }

    const updateData = {};
    if (time !== undefined) updateData.time = time;
    if (days !== undefined) updateData.days = Array.isArray(days) ? days : [];
    if (portionGrams !== undefined) updateData.portionGrams = Number(portionGrams);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (deviceId !== undefined) updateData.deviceId = deviceId;
    updateData.updatedAt = new Date();

    const schedule = await scheduleModel.findByIdAndUpdate(scheduleId, updateData, { new: true });

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Schedule updated",
      schedule,
    });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({
      success: false,
      message: "Error updating schedule",
      error: error.message,
    });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { scheduleId } = req.params;

    if (!scheduleId) {
      return res.status(400).json({
        success: false,
        message: "scheduleId is required",
      });
    }

    const schedule = await scheduleModel.findByIdAndDelete(scheduleId);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Schedule deleted",
    });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting schedule",
      error: error.message,
    });
  }
};

const toggleScheduleActive = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const { isActive } = req.body;

    if (!scheduleId) {
      return res.status(400).json({
        success: false,
        message: "scheduleId is required",
      });
    }

    const schedule = await scheduleModel.findByIdAndUpdate(
      scheduleId,
      { isActive: Boolean(isActive), updatedAt: new Date() },
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Schedule updated",
      schedule,
    });
  } catch (error) {
    console.error("Error updating schedule status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating schedule status",
      error: error.message,
    });
  }
};

const instantFeed = async (req, res) => {
  try {
    const { userId, petId, deviceId, portionGrams } = req.body;

    if (!userId || !petId || !deviceId || portionGrams === undefined) {
      return res.status(400).json({
        success: false,
        message: "userId, petId, deviceId, and portionGrams are required",
      });
    }

    const now = new Date();

    const instantSchedule = new scheduleModel({
      userId,
      petId,
      deviceId,
      time: buildTimeString(now),
      days: [],
      portionGrams: Number(portionGrams),
      isActive: false,
      lastExecutedAt: now,
    });

    const schedule = await instantSchedule.save();

    res.status(201).json({
      success: true,
      message: "Instant feed queued",
      schedule,
    });
  } catch (error) {
    console.error("Error creating instant feed:", error);
    res.status(500).json({
      success: false,
      message: "Error creating instant feed",
      error: error.message,
    });
  }
};

export {
  createSchedule,
  getSchedulesByUser,
  getSchedulesByPet,
  updateSchedule,
  deleteSchedule,
  toggleScheduleActive,
  instantFeed,
};
