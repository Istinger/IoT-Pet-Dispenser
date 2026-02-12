import mongoose from "mongoose";

const sensorsSchema = new mongoose.Schema({

  /* ===== IDENTIFICACIÓN ===== */
  deviceId: {
    type: String,
    required: true
  },

  /* ===== PRESENCIA ===== */
  pir: {
    type: Boolean,
    default: false
  },

  ir: {
    type: Boolean,
    default: false
  },

  /* ===== PESO COMIDA ===== */
  pesoComida: {
    type: Number,   // gramos
    default: 0
  },

  /* ===== PESO ANIMAL (si luego lo usas) ===== */
  pesoAnimal: {
    type: Number,   // kg
    default: 0
  },

  /* ===== SERVO ===== */
  servoAngle: {
    type: Number,
    default: 0
  },

  servoAbierto: {
    type: Boolean,
    default: false
  },

  dispensing: {
    type: Boolean,
    default: false
  },

  /* ===== CONTROL DE PORCIÓN ===== */
  portionTarget: {
    type: Number,   // gramos solicitados
    default: 0
  },

  portionDelivered: {
    type: Number,   // gramos realmente servidos
    default: 0
  },

  /* ===== METADATA ===== */
  createdAt: {
    type: Date,
    default: Date.now
  }

}, { versionKey: false });

const sensorsModel =
  mongoose.models.sensors ||
  mongoose.model("sensors", sensorsSchema);

export default sensorsModel;
