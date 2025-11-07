import { Router } from "express";
import { getBusquedaUsuarios, getAllUsuarios, getUsuario, registrarUsuario } from "../Controllers/usuariosController.js";

const usuariosRouter = Router();


usuariosRouter.get("/listado", getAllUsuarios);
usuariosRouter.get("/listadoBusqueda", getBusquedaUsuarios);
usuariosRouter.get("/participante/:idUsuario",  getUsuario);
usuariosRouter.post("/registro", registrarUsuario);
export default usuariosRouter;
