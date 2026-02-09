import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pet",
    required: true
  },

  deviceId: {
    type: String,
    required: true
  },

  /* ===== HORARIO ===== */
  time: {
    type: String, // "08:00", "18:30"
    required: true
  },

  days: {
    type: [String], // ["mon", "tue", "wed"]
    default: []
  },

  /* ===== PORCIÓN ===== */
  portionGrams: {
    type: Number,
    required: true
  },

  /* ===== ESTADO ===== */
  isActive: {
    type: Boolean,
    default: true
  },

  lastExecutedAt: {
    type: Date,
    default: null
  },

  /* ===== METADATA ===== */
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const scheduleModel =
  mongoose.models.schedule ||
  mongoose.model("schedule", scheduleSchema);

export default scheduleModel;
