import moment from "moment";
import { Sequelize } from "sequelize";
import { DefineUsers, Users } from "./models/Users";
import { DefineProjects } from "./models/Projects";
import { DefineSprints } from "./models/Sprints";
import { DefineTags } from "./models/Tags";
import { DefineTasks } from "./models/Tasks";
import { DefineUsersTasks } from "./models/UsersTasks";
import { DefineSprintsTasks } from "./models/SprintsTasks";
import { DefineProjectsSprints } from "./models/ProjectsSprints";
import { DefineUsersProjects } from "./models/UsersProjects";
import { log } from "console";

export const sequelize = new Sequelize("testSQL1", "admin", "1111", {
    host: "127.0.0.1",
    port: 49740,
    dialect: 'mssql',
    dialectModule: require("tedious"),
});

export const initDB = async () => {
    try {
        await sequelize.authenticate();
        [DefineUsers(), DefineProjects(), DefineSprints(), DefineTags(), DefineTasks(), DefineUsersTasks(), DefineSprintsTasks(), DefineProjectsSprints(), DefineUsersProjects()]
        const result = await Users?.findAll();
        console.log(result);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
