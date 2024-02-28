import { DataTypes } from "sequelize";
import { sequelize } from "..";

const UserAuth = sequelize.define('UserAuth', {
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey:true,
    references: {
      model: 'Users',
      key: 'UserID'
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'UserAuth',
  schema: 'dbo',
  timestamps: false,
  indexes: [
    {
      name: "PK_UserAuth",
      unique: true,
      fields: [
        { name: "UserID" },
      ]
    },
  ]
});

export default UserAuth;