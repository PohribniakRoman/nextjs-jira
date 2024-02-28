import { DataTypes, ModelStatic } from "sequelize";
import { sequelize } from "..";

const tagConfig = {
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
}


export type Tag =
  Record<keyof typeof tagConfig, any>;

const Tags = sequelize.define('Tags', tagConfig, {
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

export default Tags;
