import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const databaseConnection = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  logging: false,
});

export default databaseConnection;
