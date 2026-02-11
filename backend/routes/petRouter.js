import express from 'express';
import { 
  createPet, 
  getPetsByUser, 
  getActivePet, 
  getPetById, 
  updatePet, 
  updatePetProfile,
  updatePetProfileImage,
  deletePet, 
  setActivePet 
} from '../controllers/petController.js';
import upload from '../middleware/multer.js';

const petRouter = express.Router();

// CREATE - Add a new pet
petRouter.post('/', createPet);

// READ - Get all pets for a user
petRouter.get('/user/:userId', getPetsByUser);

// READ - Get active pet for a user
petRouter.get('/active/:userId', getActivePet);

// READ - Get pet by ID
petRouter.get('/:petId', getPetById);

// UPDATE - Update pet information
petRouter.put('/:petId', updatePet);

// UPDATE - Update pet profile (photo, name, weight)
petRouter.patch('/:petId/profile', updatePetProfile);

// UPDATE - Upload pet profile image
petRouter.patch('/:petId/profile-image', upload.single('image'), updatePetProfileImage);

// DELETE - Delete a pet
petRouter.delete('/:petId', deletePet);

// UPDATE - Set pet as active
petRouter.post('/active/set', setActivePet);

export default petRouter;
