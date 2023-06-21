import express, { Express, Request, Response } from 'express';
import cors from "cors";
import { pageRouter } from './src/page';
import { blobRouter } from './src/blob';
import swaggerUi from 'swagger-ui-express';

const swaggerData=require('./swagger-output.json');
const app:Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/page', pageRouter);

app.use('/blob', blobRouter)

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerData));


app.get('/', (req:Request, res:Response) => {
    res.send("Hello from Express Api")
})

app.listen(3030, () => {
    console.log("Server is running on port 3030")
})