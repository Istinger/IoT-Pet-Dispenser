import { useState, useEffect, useCallback } from 'react';
import {
  createDispenseCommand,
  getLatestSensorStatus,
  getLatestCommand
} from '../services/sensorService';

/**
 * Hook para manejar dispensado automático y manual
 * Monitorea el estado del dispensador y controla las órdenes
 */
export const useDispenser = (deviceId) => {
  const [status, setStatus] = useState(null);
  const [latestCommand, setLatestCommand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dispensing, setDispensing] = useState(false);
  const [error, setError] = useState(null);
  const pollInterval = 5000; // 5 segundos

  // Obtener estado actual del dispensador
  const refreshStatus = useCallback(async () => {
    if (!deviceId) return;

    try {
      const statusResult = await getLatestSensorStatus(deviceId);
      if (statusResult.success) {
        setStatus(statusResult.data);
      }

      const commandResult = await getLatestCommand(deviceId);
      if (commandResult.success) {
        setLatestCommand(commandResult.data);
        setDispensing(commandResult.data?.status === 'in_progress');
      }
    } catch (err) {
      console.error('Error refreshing status:', err);
    }
  }, [deviceId]);

  // Efecto para polling automático
  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, pollInterval);

    return () => clearInterval(interval);
  }, [refreshStatus]);

  // Disparar orden de dispensado manual
  const dispenseNow = useCallback(async (grams) => {
    if (!deviceId || !grams || grams <= 0) {
      setError('Invalid portion');
      return { success: false };
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createDispenseCommand(deviceId, grams);

      if (result.success) {
        setLatestCommand(result.data);
        setDispensing(true);
        await new Promise(r => setTimeout(r, 1000)); // Esperar 1s antes de refrescar
        await refreshStatus();
        return { success: true, commandId: result.commandId };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } finally {
      setLoading(false);
    }
  }, [deviceId, refreshStatus]);

  // Obtener peso actual
  const getCurrentWeight = useCallback(() => {
    return status?.pesoComida || 0;
  }, [status]);

  // Verificar si está dispensando
  const isDispensing = useCallback(() => {
    return dispensing || status?.servoAbierto === true;
  }, [dispensing, status]);

  return {
    status,
    latestCommand,
    loading,
    dispensing: isDispensing(),
    error,
    dispenseNow,
    refreshStatus,
    getCurrentWeight,
    isDispensing
  };
};
