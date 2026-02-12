/**
 * Servicio para interactuar con la API de sensores
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

/**
 * Crear una orden de dispensado manual
 */
export const createDispenseCommand = async (deviceId, portionTarget) => {
  try {
    console.log('Creating dispense command:', { deviceId, portionTarget });
    const response = await fetch(`${API_BASE}/api/sensors/commands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceId,
        dispense: true,
        portionTarget: Number(portionTarget)
      })
    });

    const data = await response.json();
    console.log('Create command response:', { status: response.status, data });

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Error creating command');
    }

    return {
      success: true,
      commandId: data.data._id,
      data: data.data
    };
  } catch (error) {
    console.error('Error creating dispense command:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Obtener el estado actual del dispensador
 */
export const getLatestSensorStatus = async (deviceId) => {
  try {
    const response = await fetch(`${API_BASE}/api/sensors/device/${deviceId}/latest`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Error fetching status');
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Error fetching sensor status:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Obtener la última orden pendiente
 */
export const getLatestCommand = async (deviceId) => {
  try {
    const response = await fetch(`${API_BASE}/api/sensors/commands/device/${deviceId}/latest`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        data: null
      };
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Error fetching latest command:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Actualizar estado de una orden
 */
export const updateCommandStatus = async (commandId, status) => {
  try {
    const response = await fetch(`${API_BASE}/api/sensors/commands/${commandId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Error updating command');
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Error updating command:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
