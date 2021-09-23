/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as fileCategoryService from "../service/file-category.service";
import { FileCategoryInterface } from "../interfaces/file-category";

/**
 * Router Definition
 */
export const fileCategoryRouter = express.Router();

/**
 * Controller Definitions
 */

// POST item
fileCategoryRouter.post("/", async (req: Request, res: Response) => {
  const body: FileCategoryInterface = req.body;

  try {
    const existingFileCategory: FileCategoryInterface[] =
      await fileCategoryService.find(body);

    if (existingFileCategory.length > 0) return res.status(400).send();

    const newFileCategory = await fileCategoryService.create(body);

    res.status(201).json(newFileCategory);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
