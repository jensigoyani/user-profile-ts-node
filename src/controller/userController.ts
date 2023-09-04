import { Request, Response } from "express";
import { compare, hashSync } from "bcrypt";
import User from "../models/user";
import { sign } from "jsonwebtoken";

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = hashSync(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = newUser.generateAccessToken();

    const userData = {
      ...newUser.dataValues,
      accessToken,
    };

    res.status(200).json({
      status: true,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // INVALID MAIL
    if (!user) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // COMPARE
    const isPasswordValid = await compare(password, user?.password || "");

    // INVALID PWD
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      status: true,
      user: {
        username: user!.username,
        email: user!.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userList = await User.findAll({});

    res.status(500).json({
      status: true,
      userList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.query.id as string, 10);

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.query.id as string, 10);

    const deletedRowCount = await User.destroy({ where: { id } });

    if (deletedRowCount === 0) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.query.id as string, 10);

    const userToUpdate = await User.findOne({ where: { id } });

    if (!userToUpdate) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (req.body.username) {
      userToUpdate.username = req.body.username;
    }

    if (req.body.email) {
      userToUpdate.email = req.body.email;
    }

    await userToUpdate.save();

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      user: userToUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
