/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as homeService from "../service/home.service";

 /**
 * Router Definition
 */
export const homeRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
homeRouter.get("/", async (req: Request, res: Response) => {
    const searchTerm: any | undefined = req.query.searchTerm;
    try {
        const search: any[] = await homeService.find(searchTerm);

        res.status(200).send(search);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});