import { DataTypes } from "sequelize";
import { sequelize } from "..";

const UsersTasks = sequelize.define('UsersTasks', {
  Task_UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  TaskID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'UsersTasks',
  schema: 'dbo',
  timestamps: false,
});

export default UsersTasks;