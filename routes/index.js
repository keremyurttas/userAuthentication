import express from "express";
import {
  registerController,
  loginController,
  updateController,
  deleteUserController,
  getUsersController,
} from "../controllers/index.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);
router.put("/update", updateController);

router.delete("/deleteUser", deleteUserController);
router.get("/users", getUsersController);
export default router;
