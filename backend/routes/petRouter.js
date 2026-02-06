import express from 'express';
import { 
  createPet, 
  getPetsByUser, 
  getActivePet, 
  getPetById, 
  updatePet, 
  deletePet, 
  setActivePet 
} from '../controllers/petController.js';

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

// DELETE - Delete a pet
petRouter.delete('/:petId', deletePet);

// UPDATE - Set pet as active
petRouter.post('/active/set', setActivePet);

export default petRouter;
