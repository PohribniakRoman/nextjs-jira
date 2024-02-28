import { DataTypes } from "sequelize";
import { sequelize } from "..";


const userConfig = {
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  }
}

export type User = Record<keyof typeof userConfig, any>;


const Users = sequelize.define('Users', userConfig, {
  createdAt: false,
  updatedAt: false,
  tableName: 'Users',
  schema: 'dbo',
  timestamps: true,
  indexes: [
    {
      name: "PK_User",
      unique: true,
      fields: [
        { name: "UserID" },
      ]
    },
  ]
});

export default Users;
