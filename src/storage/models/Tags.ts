import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";

export let Tags: ModelStatic<any> | null = null;

export const DefineTags = () => Tags = sequelize.define('Tags', {
  TagID: {
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
  priority: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  native: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'Tags',
  schema: 'dbo',
  timestamps: true,
  indexes: [
    {
      name: "PK_Tag",
      unique: true,
      fields: [
        { name: "TagID" },
      ]
    },
  ]
});
