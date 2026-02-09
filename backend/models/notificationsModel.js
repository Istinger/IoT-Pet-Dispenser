import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  deviceId: {
    type: String,
    required: true
  },

  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pet",
    default: null
  },

  /* ===== TIPO ===== */
  type: {
    type: String,
    enum: [
      "INFO",
      "WARNING",
      "CRITICAL"
    ],
    default: "INFO"
  },

  category: {
    type: String,
    enum: [
      "FOOD_LOW",
      "ANIMAL_DETECTED",
      "DISPENSING_ERROR",
      "SCHEDULE_EXECUTED",
      "DEVICE_OFFLINE"
    ],
    required: true
  },

  /* ===== CONTENIDO ===== */
  title: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  /* ===== ESTADO ===== */
  read: {
    type: Boolean,
    default: false
  },

  /* ===== METADATA ===== */
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const notificationModel =
  mongoose.models.notification ||
  mongoose.model("notification", notificationSchema);

export default notificationModel;
