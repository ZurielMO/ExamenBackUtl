import e from "cors";
import { Usuario } from "../Models/Usuario.js";
import { Op } from "sequelize";

export const getAllUsuarios = async (req, res) => {
  try {
    
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0) {
      return res.status(204).json({
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: usuarios,
      count: usuarios.length,
    });
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
    });
  }
};

export const getBusquedaUsuarios = async (req, res) => {
  const { q } = req.query;
  try { 
    const usuarios = await Usuario.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${q}%` } },
          { apellidoPaterno: { [Op.iLike]: `%${q}%` } },
          { apellidoMaterno: { [Op.iLike]: `%${q}%` } }
        ]
      },
    });
    if (usuarios.length === 0) {
      return res.status(204).json({
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      data: usuarios,
      count: usuarios.length,
    });
  } catch (error) {
    console.error("Error al buscar Usuarios:", error);
    return res.status(500).json({
      success: false,
      message: "Error al buscar los usuarios",
    });
  }
};

export const getUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  const user = await Usuario.findByPk(idUsuario);
  if (!user) {
    return res.status(404).send({
      message: "Usuario no encontrado",
    });
  }

  try {
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
    });
  }
};

export const registrarUsuario = async (req, res) => {
  const { usuario } = req.body;
  console.log(" Body recibido:", req.body);

  if (!usuario || !usuario.email?.trim() || !usuario.nombre?.trim() || !usuario.apellidoPaterno?.trim() || !usuario.apellidoMaterno?.trim()) {
  return res.status(400).json({
    success: false,
    message: "Campos requeridos faltantes o vacíos.",
  });
}


  const existe = await Usuario.findOne({ where: { email: usuario.email } });
    if (existe) {
      return res.status(409).json({
        success: false,
        message: "El correo ya está registrado.",
      });
    }
  try {
    console.log(usuario);
    const newUsuario = await Usuario.create({
      nombre: usuario.nombre,
      apellidoPaterno: usuario.apellidoPaterno,
      apellidoMaterno: usuario.apellidoMaterno,
      email: usuario.email,
      usuarioTwitter: usuario.usuarioTwitter,
      ocupacion: usuario.ocupacion,
      avatar: usuario.avatar,
    });

    return res.status(200).send({
      message: "Usuario registrado exitosamente",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Error al registrar el usuario",
    });
  }
};

