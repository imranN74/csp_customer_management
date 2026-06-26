import { type Request, type Response } from "express";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//_____________CREATE USER__________________
export async function createUser(req: Request, res: Response) {
  const name = req.body.name;
  const phone = req.body.phone;
  const password = req.body.password;
  const email = req.body.email;

  if (!name || !phone || !password || !email) {
    return res.status(404).json({
      message: "Please enter all required fields!",
    });
  }

  const userExists = await User.findOne({
    email: email,
  });

  if (userExists) {
    return res.status(409).json({
      success: false,
      message: "user already exists with this email",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createdUser = await User.create({
    name: name,
    phone: phone,
    password: hashedPassword,
    email: email,
  });

  //__response data___
  const data = {
    name: createdUser.name,
    phone: createdUser.phone,
    email: createdUser.email,
  };
  return res.status(201).json({
    message: "user created successfully",
    success: true,
    data: data,
  });
}

//______________USER LOGIN__________________
export async function login(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(404).json({
      success: false,
      message: "Please enter required fields!",
    });
  }

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User doesnt exists!",
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password!",
    });
  }

  const userData = { id: user._id, role: user.isAdmin, email: user.email };
  const secrete = process.env.JWT_SECRETE;

  if (!secrete) {
    return;
  }

  const token = jwt.sign(userData, secrete);

  return res.status(200).json({
    success: true,
    message: "loggin successful",
    token: token,
  });
}
