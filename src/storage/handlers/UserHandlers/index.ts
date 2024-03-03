import { parseFindResult } from "@/storage";
import ProjectCreators from "@/storage/models/ProjectCreators";
import Projects from "@/storage/models/Projects";
import Users, { User } from "@/storage/models/Users";
import UsersProjects from "@/storage/models/UsersProjects";

export const getUserByID = async (UserID: string) => (await Users.findOne({ where: { UserID } }))?.dataValues as User;

export const getUserProjectsByID = async (UserID: string) => {
    const ids = parseFindResult<{ ProjectID: string }>(await UsersProjects.findAll({ where: { UserID } }))
    const promisList = ids.map(async ({ ProjectID }) => (await Projects.findOne({ where: { ProjectID } }))?.dataValues)
    return await Promise.all(promisList);
};

export const checkIsUserAdmin = async (ProjectID: string, UserID: string) => (await ProjectCreators.findOne({ where: { ProjectID,UserID } }))?.dataValues