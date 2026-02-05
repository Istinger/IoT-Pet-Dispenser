import mongoose from "mongoose";

const sensorsSchema= new mongoose.Schema({
  deviceId: { type: String, required: true },
  pir: Boolean,
  button: Boolean,
  temperature: Number,
  humidity: Number,
  led: Boolean,
  servoAngle: Number,
  createdAt: { type: Date, default: Date.now }
});

const sensorsModel =mongoose.models.sensors || mongoose.model("sensors", sensorsSchema);

export default sensorsModel;