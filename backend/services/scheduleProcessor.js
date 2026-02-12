import scheduleModel from '../models/scheduleModel.js';
import sensorCommandModel from '../models/sensorCommandModel.js';

const MAX_FOOD_GRAMS = 1110;

/**
 * Obtiene todos los schedules de una mascota que están activos
 */
const getActiveSchedulesForPet = async (petId) => {
  return await scheduleModel.find({ petId, isActive: true });
};

/**
 * Verifica si es hora de ejecutar un schedule
 * @param {Object} schedule - Schedule document
 * @param {Date} now - Fecha actual (default: Date.now())
 * @returns {boolean} true si debe ejecutarse
 */
const shouldExecuteSchedule = (schedule, now = new Date()) => {
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const dayMap = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat'
  };

  const currentDay = dayMap[now.getDay()];
  const scheduleDays = Array.isArray(schedule.days) ? schedule.days : [];

  // Si no hay días asignados, asume que es para todos
  if (scheduleDays.length === 0) {
    return schedule.time === currentTime;
  }

  // Verifica si hoy está en los días programados y la hora coincide
  return scheduleDays.includes(currentDay) && schedule.time === currentTime;
};

/**
 * Verifica si ya se ejecutó hoy
 */
const hasAlreadyExecutedToday = (schedule) => {
  if (!schedule.lastExecutedAt) return false;

  const lastExec = new Date(schedule.lastExecutedAt);
  const now = new Date();

  return (
    lastExec.getFullYear() === now.getFullYear() &&
    lastExec.getMonth() === now.getMonth() &&
    lastExec.getDate() === now.getDate()
  );
};

/**
 * Crea una orden de dispensado para un schedule
 */
const executeSchedule = async (schedule) => {
  try {
    const { portionGrams, deviceId } = schedule;

    if (!deviceId) {
      console.error(` Schedule ${schedule._id} sin deviceId`);
      return null;
    }

    if (portionGrams <= 0 || portionGrams > MAX_FOOD_GRAMS) {
      console.error(` Porción inválida: ${portionGrams}g`);
      return null;
    }

    // Crear orden de dispensado
    const command = new sensorCommandModel({
      deviceId,
      dispense: true,
      portionTarget: portionGrams,
      status: 'pending'
    });

    await command.save();

    // Marcar schedule como ejecutado
    await scheduleModel.findByIdAndUpdate(
      schedule._id,
      { lastExecutedAt: new Date() },
      { new: true }
    );

    console.log(`✅ Schedule ejecutado: ${schedule._id} → ${portionGrams}g a ${deviceId}`);
    return command;
  } catch (error) {
    console.error(` Error ejecutando schedule:`, error);
    return null;
  }
};

/**
 * Procesa todos los schedules activos y ejecuta los que corresponden
 * (Se puede ejecutar cada minuto desde un cron job o setInterval)
 */
const processSchedules = async () => {
  try {
    const activeSchedules = await scheduleModel.find({ isActive: true });

    for (const schedule of activeSchedules) {
      // Verifica si es hora y no se ha ejecutado hoy
      if (shouldExecuteSchedule(schedule) && !hasAlreadyExecutedToday(schedule)) {
        await executeSchedule(schedule);
      }
    }
  } catch (error) {
    console.error(' Error procesando schedules:', error);
  }
};

/**
 * Inicia un procesador de schedules (ejecuta cada minuto)
 */
const startScheduleProcessor = (intervalMs = 60000) => {
  console.log(' Iniciando procesador de schedules...');

  // Ejecutar inmediatamente
  processSchedules();

  // Luego cada intervalo
  return setInterval(processSchedules, intervalMs);
};

export {
  getActiveSchedulesForPet,
  shouldExecuteSchedule,
  hasAlreadyExecutedToday,
  executeSchedule,
  processSchedules,
  startScheduleProcessor
};
