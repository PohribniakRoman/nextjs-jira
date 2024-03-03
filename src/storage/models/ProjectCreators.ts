import { DataTypes } from "sequelize";
import { sequelize } from "..";

const ProjectCreators = sequelize.define('ProjectCreators', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProjectID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'ProjectCreators',
  schema: 'dbo',
  timestamps: false,
});

export default ProjectCreators;