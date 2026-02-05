import express from "express";
import { listUsers, getUser, updateUser, patchUser, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

//RESTful API endpoints for user CRUD operations

userRouter.get('/', listUsers);

userRouter.get('/:id', getUser);

userRouter.put('/:id', updateUser);

userRouter.patch('/:id', patchUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;