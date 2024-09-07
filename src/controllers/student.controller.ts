import { Request, Response } from "express";
import db from "../database/prismaConnection";

class StudentController {
  public async create(req: Request, res: Response) {
    const { name, surname, cpf } = req.body;
    if (!name || !surname || !cpf) {
      return res.status(400).json({ success: false, msg: "Empity fields" });
    }
    try {
      const student = await db.student.create({
        data: {
          name,
          surname,
          cpf,
        },
      });
      if (student) {
        return res.status(201).json({ success: true, msg: "Student created" });
      }
      return res.status(400).json({ success: false, msg: "Invalid CPF" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "error database", error });
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const students = await db.student.findMany({
        orderBy: {
          created_at: 'desc'
        }
      });
      if (students) {
        return res
          .status(200)
          .json({ success: true, msg: "Students listing", data: students });
      }
      return res
        .status(400)
        .json({ success: false, msg: "Students not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "error database", error });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Id is required" });
    }
    try {
      const findStudent = await db.student.findUnique({
        where: { id },
      });
      if (!findStudent) {
        return res
          .status(404)
          .json({ success: false, msg: "Student not found" });
      }

      const deleteStudent = await db.student.delete({
        where: { id },
      });

      if (deleteStudent) {
        return res.status(200).json({ success: true, msg: "Student deleted" });
      }

      return res
        .status(400)
        .json({ success: false, msg: "Error on delete student" });
    } catch (error) {
      return res.status(500).json({ success: false, msg: "Error database" });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Id is required" });
    }
    try {
      const student = await db.student.findUnique({
        where: { id },
      });
      if (student) {
        return res
          .status(200)
          .json({ success: true, msg: "Student found", data: student });
      }
      return res.status(404).json({ success: false, msg: "Student not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Error database", error });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, surname, cpf } = req.body;
    try {
      const student = await db.student.update({
        where: { id },
        data: {
          name,
          surname,
          cpf,
        },
      });
      if (student) {
        return res
          .status(200)
          .json({ success: true, msg: "Student updated", data: student });
      }
      return res
        .status(400)
        .json({ success: false, msg: "Student not updated" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Error database", error });
    }
  }
}

export default StudentController;
