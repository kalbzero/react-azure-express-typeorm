/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as coursesService from "../service/courses.service";
import { CourseInterface, BaseCourse } from '../interfaces/course';

/**
 * Router Definition
 */
export const coursesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
coursesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const courses: CourseInterface[] = await coursesService.findAll();

        res.status(200).send(courses);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/// GET items/:id
coursesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const course: CourseInterface | undefined = await coursesService.find(id);

        if (course) {
        return res.status(200).send(course);
        }

        res.status(404).send("course ["+ id +"] not found");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST items
coursesRouter.post("/", async (req: Request, res: Response) => {
    try {
      const course: BaseCourse = req.body;
      
      const newCourse = await coursesService.create(course);
      
      res.status(201).json(newCourse);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// PUT items/:id
coursesRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const courseUpdate: CourseInterface = req.body;
  
      const existingCourse: CourseInterface | undefined = await coursesService.find(id);
  
      if (existingCourse) {
        const updatedCourse = await coursesService.update(id, courseUpdate);
        return res.status(200).json(updatedCourse);
      }
  
      const newCourse = await coursesService.create(courseUpdate);
  
      res.status(201).json(newCourse);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// DELETE items/:id
coursesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await coursesService.remove(id);
  
      res.sendStatus(204);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});