import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";

export let Sprints: ModelStatic<any> | null = null;

export const DefineSprints = () => Sprints = sequelize.define('Sprints', {
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
}, {
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
