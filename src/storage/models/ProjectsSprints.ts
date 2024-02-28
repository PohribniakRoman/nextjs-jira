import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";


const ProjectsSprints = sequelize.define('ProjectsSprints', {
  Project_SprintID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ProjectID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  SprintID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sprints',
      key: 'SprintID'
    }
  }
}, {
  createdAt:false,
  updatedAt:false,
  tableName: 'ProjectsSprints',
  schema: 'dbo',
  timestamps: false,
  indexes: [
    {
      name: "PK_Project_Sprints",
      unique: true,
      fields: [
        { name: "Project_SprintID" },
      ]
    },
  ]
});

export default ProjectsSprints;
