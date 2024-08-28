import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "./config";
import mongoose from "mongoose";
import { registerRoutes } from "./routes";

const PORT = config.server.port;

const app: Express = express();

app.use(express.json());
app.use(cors());

(async function startUp() {
  try {
    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });

    console.log("Connection to MongoDB successful!");

    registerRoutes(app)

    app.get("/test", (req: Request, res: Response) => {
      res.status(200).json({ message: "server is running!" });
    });

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("couldn't connect to server");
  }
})();
