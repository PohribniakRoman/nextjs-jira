import { DataTypes, ModelCtor, ModelStatic } from "sequelize";
import { sequelize } from "..";


export let Users:ModelStatic<any>|null = null;  

export const DefineUsers = () => Users = sequelize.define('Users', {
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(64),
    allowNull: false
  }
}, {
  createdAt:false,
  updatedAt:false,
  tableName: 'Users',
  schema: 'dbo',
  timestamps: true,
  indexes: [
    {
      name: "PK_User",
      unique: true,
      fields: [
        { name: "UserID" },
      ]
    },
  ]
});