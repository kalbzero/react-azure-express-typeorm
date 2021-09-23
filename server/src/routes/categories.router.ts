/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as categoriesService from "../service/categories.service";
import { CategoryInterface, BaseCategory } from '../interfaces/category';

/**
 * Router Definition
 */
export const categoriesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET categories
categoriesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const categories: CategoryInterface[] = await categoriesService.findAll();

        res.status(200).send(categories);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// GET categories/:id
categoriesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const category: CategoryInterface | undefined = await categoriesService.find(id);

        if (category) {
        return res.status(200).send(category);
        }

        res.status(404).send("category ["+ id +"] not found");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST categories
categoriesRouter.post("/", async (req: Request, res: Response) => {
    try {
      const category: BaseCategory = req.body;
  
      const newCategory = await categoriesService.create(category);
  
      res.status(201).json(newCategory);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// PUT categories/:id
categoriesRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const categoryUpdate: CategoryInterface = req.body;
  
      const existingCategory: CategoryInterface | undefined = await categoriesService.find(id);
  
      if (existingCategory) {
        const updatedCategory = await categoriesService.update(id, categoryUpdate);
        return res.status(200).json(updatedCategory);
      }
  
      const newCategory = await categoriesService.create(categoryUpdate);
  
      res.status(201).json(newCategory);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// DELETE categories/:id
categoriesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await categoriesService.remove(id);
  
      res.sendStatus(204);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});