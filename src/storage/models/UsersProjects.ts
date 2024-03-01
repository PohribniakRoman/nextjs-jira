import { DataTypes } from "sequelize";
import { sequelize } from "..";


const UsersProjects = sequelize.define('UsersProjects', {
  User_ProjectID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'UserID'
    }
  },
  ProjectID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Projects',
      key: 'ProjectID'
    }
  }
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'UsersProjects',
  schema: 'dbo',
  timestamps: false,
  indexes: [
    {
      name: "PK_User_SprintsID",
      unique: true,
      fields: [
        { name: "User_ProjectID" },
      ]
    },
  ]
});

export default UsersProjects;