import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";


const taskConfig = {
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
}

export type Task =
  Record<keyof typeof taskConfig, any>;


const Tasks = sequelize.define('Tasks', taskConfig, {
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

export default Tasks;

