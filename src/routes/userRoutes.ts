import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateUser,
} from "../controller/userController";

const userRouter = Router();

userRouter.post("/create", createUser);

userRouter.post("/login", loginUser);

userRouter.get("/userList", getAllUsers);

userRouter.get("/user", getSingleUser);

userRouter.delete("/delete", deleteUser);

userRouter.put("/update", updateUser);

export default userRouter;
