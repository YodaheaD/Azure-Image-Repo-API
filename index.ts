import express, { Express, Request, Response } from 'express';
import cors from "cors";
import { pageRouter } from './src/page';
const app:Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/page', pageRouter);

app.get('/', (req:Request, res:Response) => {
    res.send("Hello from Express Api")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})