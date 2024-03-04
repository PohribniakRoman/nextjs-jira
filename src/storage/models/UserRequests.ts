import { DataTypes } from "sequelize";
import { sequelize } from "..";


const UserRequests = sequelize.define('UserRequests', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement:true,
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
  isAccepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'UserRequests',
  schema: 'dbo',
  timestamps: false,
});

export default UserRequests;