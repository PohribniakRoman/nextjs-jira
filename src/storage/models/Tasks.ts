import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";


const taskConfig = {
  TaskID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  priority: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estimate: {
    type: DataTypes.BIGINT,
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
  },
  AssigneeID:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CreatorID:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProjectID:{
    type: DataTypes.INTEGER,
    allowNull: false,
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
});

export default Tasks;

