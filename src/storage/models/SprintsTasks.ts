import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";

export let SprintsTasks: ModelStatic<any> | null = null;

export const DefineSprintsTasks = () => SprintsTasks = sequelize.define('SprintsTasks', {
  Sprint_TaskID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  SprintID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sprints',
      key: 'SprintID'
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
  tableName: 'SprintsTasks',
  schema: 'dbo',
  timestamps: false,
  indexes: [
    {
      name: "PK_Sprint_Tasks",
      unique: true,
      fields: [
        { name: "Sprint_TaskID" },
      ]
    },
  ]
});
