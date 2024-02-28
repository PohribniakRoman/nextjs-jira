import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";


const sprintConfig = {
  SprintID: {
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
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  stage: {
    type: DataTypes.STRING(16),
    allowNull: false
  }
}

export type Sprint =
  Record<keyof typeof sprintConfig, any>;


const Sprints = sequelize.define('Sprints', sprintConfig, {
  createdAt: false,
  updatedAt: false,
  tableName: 'Sprints',
  schema: 'dbo',
  timestamps: false,
  indexes: [
    {
      name: "PK_Sprints",
      unique: true,
      fields: [
        { name: "SprintID" },
      ]
    },
  ]
});

export default Sprints;

