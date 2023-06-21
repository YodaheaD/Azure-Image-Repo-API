import express, { Express, Request, Response, Router } from "express";
import { logger } from "../utils/logger";

export const pageRouter: Router = Router();

pageRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello from Page Router");
});

pageRouter.post("/Post", (req: Request, res: Response) => {
  // Data sent to route should look like this:{"name":"Yodahea","age": 8}
  const { name, age } = req.body;
  logger.info(`PageRouter: name: ${name}, age: ${age}`);
  res.send(`Hello ${name} from Page Router. You are ${age} years old`);
});
