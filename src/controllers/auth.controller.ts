import { Request, Response } from "express";
import db from "../database/prismaConnection";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

class AuthController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Empty fields" });
    }
    try {
      const userExists = await db.user.findUnique({ where: { email } });

      if (!userExists) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }

      const comparePass = await bcrypt.compare(password, userExists.password);

      if (!comparePass) {
        return res.status(400).json({ success: false, msg: "not logged" });
      }

      const newToken = uuid();

      await db.user.update({
        data: {
          token: newToken,
        },
        where: {
          email,
        },
      });

      return res
        .status(200)
        .json({ success: true, msg: "Logged", token: newToken });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Error database", err });
    }
  }
}

export default AuthController;
