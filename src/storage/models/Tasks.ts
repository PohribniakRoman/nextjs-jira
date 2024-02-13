import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";

export let Tasks: ModelStatic<any> | null = null;

export const DefineTasks = () => Tasks = sequelize.define('Tasks', {
  TaskID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  TagID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Tags',
      key: 'TagID'
    }
  },
  estimate: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(64),
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'Tasks',
  schema: 'dbo',
  timestamps: true,
  indexes: [
    {
      name: "PK_Tasks",
      unique: true,
      fields: [
        { name: "TaskID" },
      ]
    },
  ]
});
