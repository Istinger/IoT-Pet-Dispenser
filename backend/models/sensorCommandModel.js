import mongoose from "mongoose";

const sensorCommandSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true
  },
  dispense: {
    type: Boolean,
    default: false
  },
  portionTarget: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
}, { versionKey: false });

const sensorCommandModel =
  mongoose.models.sensor_command ||
  mongoose.model("sensor_command", sensorCommandSchema);

export default sensorCommandModel;
