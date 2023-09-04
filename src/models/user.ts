// import { Sequelize, DataTypes } from "sequelize";
// import sequelize from "../../db/db";

// const users = sequelize.define("users", {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: Date.now(),
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: Date.now(),
//   },
// });

// export default users;

// user.ts
import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../../db/db";
import { sign } from "jsonwebtoken";

interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Extend Model to include UserAttributes
class User extends Model<UserAttributes> implements UserAttributes {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;

  public generateAccessToken() {
    const token = sign({ id: this.id }, "SecretKey", {
      expiresIn: "1h",
    });
    return token;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

export default User;
