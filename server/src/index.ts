import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DbConnection } from "./config/connection.js";
import { Router } from "express";
import rootRoutes from "./routes/index.js";

const app: Application = express();
app.use(express.json());
app.use(cors({}));
dotenv.config();
const connectionUri = process.env.DB_CONNECTION_URI || "";
DbConnection(connectionUri);

const port = process.env.PORT;

app.use("/api", rootRoutes);

app.listen(port, () => {
  console.log("server started on port:", port);
});
