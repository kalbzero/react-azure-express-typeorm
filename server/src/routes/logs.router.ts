/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as logsService from "../service/logs.service";
import { LogInterface, BaseLog } from '../interfaces/log';

/**
 * Router Definition
 */
export const logsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
logsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const logs: LogInterface[] = await logsService.findAll();

        res.status(200).send(logs);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/// GET items/:id
logsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const log: LogInterface | undefined = await logsService.find(id);

        if (log) {
        return res.status(200).send(log);
        }

        res.status(404).send("log ["+ id +"] not found");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST items
logsRouter.post("/", async (req: Request, res: Response) => {
    try {
      const log: BaseLog = req.body;
  
      const newLog = await logsService.create(log);
  
      res.status(201).json(newLog);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// PUT items/:id
logsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const logUpdate: LogInterface = req.body;
  
      const existingLog: LogInterface | undefined = await logsService.find(id);
  
      if (existingLog) {
        const updatedLog = await logsService.update(id, logUpdate);
        return res.status(200).json(updatedLog);
      }
  
      const newLog = await logsService.create(logUpdate);
  
      res.status(201).json(newLog);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// DELETE items/:id
logsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await logsService.remove(id);
  
      res.sendStatus(204);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});