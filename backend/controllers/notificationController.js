import notificationModel from "../models/notificationsModel.js";

const createNotification = async (req, res) => {
  try {
    const { userId, deviceId, petId, type, category, title, message } = req.body;

    if (!userId || !deviceId || !category || !title || !message) {
      return res.json({
        success: false,
        message: "userId, deviceId, category, title, and message are required"
      });
    }

    const notification = await notificationModel.create({
      userId,
      deviceId,
      petId: petId || null,
      type: type || "INFO",
      category,
      title,
      message,
      read: false
    });

    res.json({
      success: true,
      message: "Notification created",
      notification
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!userId) {
      return res.json({
        success: false,
        message: "userId is required"
      });
    }

    const notifications = await notificationModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await notificationModel.countDocuments({ userId });

    res.json({
      success: true,
      notifications,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUnreadNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.json({
        success: false,
        message: "userId is required"
      });
    }

    const notifications = await notificationModel
      .find({ userId, read: false })
      .sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    if (!notificationId) {
      return res.json({
        success: false,
        message: "notificationId is required"
      });
    }

    const notification = await notificationModel.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.json({ success: false, message: "Notification not found" });
    }

    res.json({ success: true, notification });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const markAllNotificationsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.json({
        success: false,
        message: "userId is required"
      });
    }

    await notificationModel.updateMany(
      { userId, read: false },
      { read: true }
    );

    res.json({ success: true, message: "Notifications marked as read" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    if (!notificationId) {
      return res.json({
        success: false,
        message: "notificationId is required"
      });
    }

    const notification = await notificationModel.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.json({ success: false, message: "Notification not found" });
    }

    res.json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  createNotification,
  getNotificationsByUser,
  getUnreadNotificationsByUser,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification
};
