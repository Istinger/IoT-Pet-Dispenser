import express from "express";
import {
  createNotification,
  getNotificationsByUser,
  getUnreadNotificationsByUser,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.post("/", createNotification);
notificationRouter.get("/user/:userId", getNotificationsByUser);
notificationRouter.get("/user/:userId/unread", getUnreadNotificationsByUser);
notificationRouter.patch("/:notificationId/read", markNotificationRead);
notificationRouter.patch("/user/:userId/read-all", markAllNotificationsRead);
notificationRouter.delete("/:notificationId", deleteNotification);

export default notificationRouter;
