import petModel from "../models/petModel.js";
import userModel from "../models/userModel.js";

// Crear una nueva mascota
const createPet = async (req, res) => {
  try {
    const { userId, name, breed, age, weight, activityLevel, profileImage, notes } = req.body;

    console.log('📝 Creando mascota con datos:', { userId, name, breed, age, weight, activityLevel });

    // Validar campos requeridos
    if (!userId || !name || !breed || age === undefined || weight === undefined) {
      return res.json({ 
        success: false, 
        message: "userId, name, breed, age, and weight are required" 
      });
    }

    // Verificar que el usuario existe
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      console.log('❌ Usuario no encontrado:', userId);
      return res.json({ 
        success: false, 
        message: "User not found" 
      });
    }

    console.log('✅ Usuario encontrado:', userExists.name);

    const newPet = new petModel({
      userId,
      name,
      breed,
      age,
      weight,
      activityLevel: activityLevel || 'moderate',
      profileImage: profileImage || '',
      notes: notes || ''
    });

    const pet = await newPet.save();
    console.log('✅ Mascota guardada en DB:', pet._id);
    
    // Agregar el nombre de la mascota a petNames del usuario
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { petNames: name } },
      { new: true }
    );
    
    console.log('✅ Usuario actualizado. petNames:', updatedUser.petNames);
    
    res.json({ 
      success: true, 
      message: "Pet created successfully", 
      pet,
      userPetNames: updatedUser.petNames
    });

  } catch (error) {
    console.error('❌ Error al crear mascota:', error);
    res.json({ success: false, message: error.message });
  }
};

// Obtener todas las mascotas del usuario
const getPetsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.json({ 
        success: false, 
        message: "userId is required" 
      });
    }

    const pets = await petModel.find({ userId });

    if (!pets || pets.length === 0) {
      return res.json({ 
        success: true, 
        message: "No pets found for this user", 
        pets: [] 
      });
    }

    res.json({ 
      success: true, 
      pets 
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Obtener mascota activa del usuario
const getActivePet = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.json({ 
        success: false, 
        message: "userId is required" 
      });
    }

    const activePet = await petModel.findOne({ 
      userId, 
      isActive: true 
    });

    if (!activePet) {
      return res.json({ 
        success: false, 
        message: "No active pet found for this user" 
      });
    }

    res.json({ 
      success: true, 
      pet: activePet 
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Obtener mascota por ID
const getPetById = async (req, res) => {
  try {
    const { petId } = req.params;

    if (!petId) {
      return res.json({ 
        success: false, 
        message: "petId is required" 
      });
    }

    const pet = await petModel.findById(petId);

    if (!pet) {
      return res.json({ 
        success: false, 
        message: "Pet not found" 
      });
    }

    res.json({ 
      success: true, 
      pet 
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Actualizar mascota
const updatePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const { name, breed, age, weight, activityLevel, profileImage, notes, isActive } = req.body;

    if (!petId) {
      return res.json({ 
        success: false, 
        message: "petId is required" 
      });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (breed !== undefined) updateData.breed = breed;
    if (age !== undefined) updateData.age = age;
    if (weight !== undefined) updateData.weight = weight;
    if (activityLevel !== undefined) updateData.activityLevel = activityLevel;
    if (profileImage !== undefined) updateData.profileImage = profileImage;
    if (notes !== undefined) updateData.notes = notes;
    if (isActive !== undefined) updateData.isActive = isActive;
    updateData.updatedAt = new Date();

    const updatedPet = await petModel.findByIdAndUpdate(petId, updateData, { new: true });

    if (!updatedPet) {
      return res.json({ 
        success: false, 
        message: "Pet not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Pet updated successfully", 
      pet: updatedPet 
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Eliminar mascota
const deletePet = async (req, res) => {
  try {
    const { petId } = req.params;

    if (!petId) {
      return res.json({ 
        success: false, 
        message: "petId is required" 
      });
    }

    const deletedPet = await petModel.findByIdAndDelete(petId);

    if (!deletedPet) {
      return res.json({ 
        success: false, 
        message: "Pet not found" 
      });
    }

    // Eliminar el nombre de la mascota de petNames del usuario
    await userModel.findByIdAndUpdate(
      deletedPet.userId,
      { $pull: { petNames: deletedPet.name } },
      { new: true }
    );

    res.json({ 
      success: true, 
      message: "Pet deleted successfully" 
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Establecer mascota como activa
const setActivePet = async (req, res) => {
  try {
    const { petId, userId } = req.body;

    if (!petId || !userId) {
      return res.json({ 
        success: false, 
        message: "petId and userId are required" 
      });
    }

    // Desactivar todas las mascotas del usuario
    await petModel.updateMany({ userId }, { isActive: false });

    // Activar la mascota seleccionada
    const activePet = await petModel.findByIdAndUpdate(
      petId, 
      { isActive: true }, 
      { new: true }
    );

    if (!activePet) {
      return res.json({ 
        success: false, 
        message: "Pet not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Pet set as active", 
      pet: activePet 
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  createPet, 
  getPetsByUser, 
  getActivePet, 
  getPetById, 
  updatePet, 
  deletePet, 
  setActivePet 
};
