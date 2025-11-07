import { Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const Usuario = databaseConnection.define(
  "usuarios",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "idUsuario",
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidoPaterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidoMaterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuarioTwitter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ocupacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    freezeTableName: true,
    paranoid: false,
  });
