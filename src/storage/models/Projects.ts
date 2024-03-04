import { DataTypes } from "sequelize";
import { sequelize } from "..";

const projectsConfig = {
  ProjectID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
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
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ownerID: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}

export type Project = Record<keyof typeof projectsConfig, any>;

const Projects = sequelize.define('Projects', projectsConfig, {
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

export default Projects;