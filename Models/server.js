import express from "express";
import cors from "cors";
import start_router from "../Routes/startRoutes.js";
import usuariosRouter from "../Routes/usuariosRoutes.js";
import { Sequelize } from "sequelize";
import databaseConnection from "../Config/connection.js";
import { Usuario } from "./Usuario.js";


export class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.connection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async connection() {
    try {
      await databaseConnection.authenticate();
      await Usuario.sync();
      console.log("Conectado");
    } catch (e) {
      console.log(e);
    }
  }

  routes() {
    this.app.use("/api/start", start_router);
    this.app.use("/api/", usuariosRouter);

  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
