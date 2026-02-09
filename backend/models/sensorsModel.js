import mongoose from "mongoose";

const sensorsSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true
  },

  /* ===== PRESENCIA ===== */
  pir: {
    type: Boolean,
    default: false
  },

  irProximity: {
    type: Boolean,
    default: false
  },

  /* ===== PESO ===== */
  weightAnimal: {
    type: Number, // kg
    default: 0
  },

  weightFood: {
    type: Number, // gramos
    default: 0
  },

  /* ===== DISPENSADOR ===== */
  servoAngle: {
    type: Number,
    default: 0
  },

  dispensing: {
    type: Boolean,
    default: false
  },

  /* ===== EVENTOS ===== */
  portionTarget: {
    type: Number, // gramos solicitados por backend
    default: 0
  },

  portionDelivered: {
    type: Number, // gramos reales entregados
    default: 0
  },

  /* ===== METADATA ===== */
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const sensorsModel =
  mongoose.models.sensors ||
  mongoose.model("sensors", sensorsSchema);

export default sensorsModel;
