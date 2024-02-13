import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";

export let UsersTasks: ModelStatic<any> | null = null;

export const DefineUsersTasks = () => UsersTasks = sequelize.define('UsersTasks', {
  Task_UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'UserID'
    }
  },
  TaskID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Tasks',
      key: 'TaskID'
    }
  }
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'UsersTasks',
  schema: 'dbo',
  timestamps: false,
  indexes: [
    {
      name: "PK_User_Tasks",
      unique: true,
      fields: [
        { name: "Task_UserID" },
      ]
    },
  ]
});
