import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";

const projectsConfig = {
  ProjectID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}

export let Projects: ModelStatic<any> | null = null;

export const DefineProjects = () => Projects = sequelize.define('Projects', projectsConfig, {
  updatedAt: false,
  createdAt: false,
  tableName: 'Projects',
  schema: 'dbo',
  timestamps: true,
  indexes: [
    {
      name: "PK_Projects",
      unique: true,
      fields: [
        { name: "ProjectID" },
      ]
    },
  ]
});
