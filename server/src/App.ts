import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from './AppRoutes';
import mongoose from "mongoose";
import { clientErrorHandler, errorHandler, logging } from "./utils/ErrorHandler";

class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // this.app.use(this.contentTypeValidation);
        // this.app.use(this.acceptHeaderValidation);
        this.app.use('/api', routes);
        this.dbConnection();
        this.app.use(logging);
        this.app.use(clientErrorHandler);
        this.app.use(errorHandler);
    }

    private contentTypeValidation = (req: Request, res: Response, next: NextFunction) => {
        var contentType = req.headers['content-type'];
        if (!contentType || contentType.indexOf('application/json') !== 0)
            return res.sendStatus(415);
        next();
    }

    private acceptHeaderValidation = (req: Request, res: Response, next: NextFunction) => {
        var contentType = req.headers['accept'];
        if (!contentType || contentType.indexOf('application/json') !== 0)
            return res.sendStatus(406);
        next();
    }
    private dbConnection = () => {
        mongoose.connect('mongodb://127.0.0.1:27017/salesdb',
            function (error: any) {
                if (error) { console.log(error); }
            },
        );
    }
}

export default new App().app;