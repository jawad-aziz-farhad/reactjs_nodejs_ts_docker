import * as bodyParser from "body-parser";
import * as express from "express";
import { RestApiHandler } from "./routes/route_handler";
import * as mongoose from 'mongoose';

const serverLogger = console;
const app = express();

const addRoutes = async () => {
    try {

        app
            .use(bodyParser.urlencoded({ "extended": false }))
            .use(bodyParser.json())
            .use("/api", RestApiHandler());

    } catch (err) {
        serverLogger.dir(err);
    }
};

const setMongoConfig = async () => {
    //using our constant instead of the hard coded String
    mongoose.connect('mongodb://mongo:27017/code-challange', {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  }

addRoutes();

setMongoConfig();

export default app;