import express from "express";
import {
  createSchedule,
  getSchedulesByUser,
  getSchedulesByPet,
  updateSchedule,
  deleteSchedule,
  toggleScheduleActive,
  instantFeed,
} from "../controllers/scheduleController.js";

const scheduleRouter = express.Router();

// CREATE
scheduleRouter.post("/", createSchedule);

// READ
scheduleRouter.get("/user/:userId", getSchedulesByUser);
scheduleRouter.get("/pet/:petId", getSchedulesByPet);

// UPDATE
scheduleRouter.put("/:scheduleId", updateSchedule);
scheduleRouter.patch("/:scheduleId/active", toggleScheduleActive);

// DELETE
scheduleRouter.delete("/:scheduleId", deleteSchedule);

// INSTANT
scheduleRouter.post("/instant", instantFeed);

export default scheduleRouter;
