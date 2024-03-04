import { parseFindResult } from "@/storage";
import ProjectCreators from "@/storage/models/ProjectCreators";
import Projects from "@/storage/models/Projects";
import Users, { User } from "@/storage/models/Users";
import UsersProjects from "@/storage/models/UsersProjects";

export const getUserByID = async (UserID: string,ownerID:string,ProjectID:string) => {
    const user = (await Users.findOne({ where: { UserID } }))?.dataValues as User;
    const isAdmin = !!(await ProjectCreators.findOne({ where: { ProjectID,UserID } }))?.dataValues;
    return {...user,isOwner:ownerID === user.UserID,isAdmin};
};

export const getUserProjectsByID = async (UserID: string) => {
    const ids = parseFindResult<{ ProjectID: string }>(await UsersProjects.findAll({ where: { UserID } }))
    const promisList = ids.map(async ({ ProjectID }) => (await Projects.findOne({ where: { ProjectID } }))?.dataValues)
    return await Promise.all(promisList);
};

export const checkIsUserAdmin = async (ProjectID: string, UserID: string) => (await ProjectCreators.findOne({ where: { ProjectID, UserID } }))?.dataValues

export const addUserToProject = async (ProjectID: string, UserID: string) => {
    try {
        await UsersProjects.create({ ProjectID, UserID })
        return true;
    } catch (error) {
        return false;
    }
}

export const addAdminToProject = async (ProjectID: string, UserID: string) => {
    try {
        await ProjectCreators.create({ ProjectID, UserID });
        return true;
    } catch (error) {
        return false;
    }
}
