import { Request, Response } from "express";
import db from "../database/prismaConnection";
import generateHash from "../utils/generateHash";

class UserController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Empty fields" });
    }
    try {
      const hashPass = generateHash(password);
      
      const user = await db.user.create({
        data: {
          email,
          password: hashPass
        }
      })

      if(user){
        return res.status(201).json({ success: true, msg: "User created"})
      }
    } catch (err) {
      return res.status(500).json({success: false, msg: "Error database", err})
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const users = await db.user.findMany();
      return res
        .status(200)
        .json({ success: true, msg: "Users retrieved", data: users });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Error database", error });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Id is required" });
    }
    try {
      const user = await db.user.findUnique({
        where: { id },
      });
      if (user) {
        return res
          .status(200)
          .json({ success: true, msg: "User found", data: user });
      }
      return res.status(404).json({ success: false, msg: "User not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Error database", error });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { email, password } = req.body;
    if (!id || !email || !password) {
      return res.status(400).json({ success: false, msg: "Empty fields or Id is required" });
    }
    try {
      const hashPass = generateHash(password);
      const user = await db.user.update({
        where: { id },
        data: {
          email,
          password: hashPass,
        },
      });
      if (user) {
        return res
          .status(200)
          .json({ success: true, msg: "User updated", data: user });
      }
      return res
        .status(400)
        .json({ success: false, msg: "User not updated" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Error database", error });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Id is required" });
    }
    try {
      const user = await db.user.delete({
        where: { id },
      });
      return res
        .status(200)
        .json({ success: true, msg: "User deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Error database", error });
    }
  }
}

export default UserController;
