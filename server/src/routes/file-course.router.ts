/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as fileCourseService from "../service/file-course.service";
import { FileCourseInterface } from "../interfaces/file-course";

/**
 * Router Definition
 */
export const fileCourseRouter = express.Router();

/**
 * Controller Definitions
 */

// POST item
fileCourseRouter.post("/", async (req: Request, res: Response) => {
  const body: FileCourseInterface = req.body;

  try {
    const existFileCourse = await fileCourseService.find(body);

    if (existFileCourse.length > 0) return res.status(400).send();

    const newFileCourse = await fileCourseService.create(body);

    res.status(201).json(newFileCourse);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
