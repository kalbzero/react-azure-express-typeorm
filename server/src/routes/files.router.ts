/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as filesService from "../service/files.service";
import { FileInterface, BaseFile } from '../interfaces/file';

/**
 * Router Definition
 */
export const filesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
filesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const files: FileInterface[] = await filesService.findAll();

        res.status(200).send(files);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// GET items/:id
filesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const file: FileInterface | undefined = await filesService.find(id);

        if (file) {
        return res.status(200).send(file);
        }

        res.status(404).send("file ["+ id +"] not found");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST items
filesRouter.post("/", async (req: Request, res: Response) => {
    try {
      const file: BaseFile = req.body;
  
      const existingFile: FileInterface | undefined = await filesService.findOne(file);

      if (existingFile) {
        const updatedItem = await filesService.update(existingFile.num_seq, file);
        return res.status(200).json(updatedItem);
      }

      const newFile = await filesService.create(file);
  
      res.status(201).json(newFile);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// PUT items/:id
filesRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const fileUpdate: FileInterface = req.body;
  
      const existingFile: FileInterface | undefined = await filesService.find(id);
  
      if (existingFile) {
        const updatedItem = await filesService.update(id, fileUpdate);
        return res.status(200).json(updatedItem);
      }
  
      const newFile = await filesService.create(fileUpdate);
  
      res.status(201).json(newFile);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// DELETE items/:id
filesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await filesService.remove(id);
  
      res.sendStatus(204);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});