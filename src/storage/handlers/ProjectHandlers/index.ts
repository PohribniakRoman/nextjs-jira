import { parseFindResult } from "@/storage";
import Projects, { Project } from "@/storage/models/Projects";
import { User } from "@/storage/models/Users";
import { getUserByID } from "../UserHandlers";
import UsersProjects from "@/storage/models/UsersProjects";
import ProjectCreators from "@/storage/models/ProjectCreators";
import UserRequests from "@/storage/models/UserRequests";

export const getAllProjects = async () => parseFindResult<Project>(await Projects?.findAll() || []);

export const getProjectUsers = async (ProjectID: string) => parseFindResult<User>(await UsersProjects?.findAll({ where: { ProjectID } }) || []);

export const getProjectByID = async (ProjectID: string) => (await Projects?.findOne({ where: { ProjectID } }))?.dataValues as Project;

export const getProjectUserDetails = async (ProjcetID: string) => {
    const project = await getProjectByID(ProjcetID);
    const promisList = (await getProjectUsers(ProjcetID)).map(({ UserID }) =>
        getUserByID(UserID, project.ownerID, ProjcetID)
    )
    return await Promise.all(promisList)
}

export const deleteUserFromProject = async (ProjectID: string, UserID: string) => {
    try {
        await UsersProjects.destroy({ where: { ProjectID, UserID }, force: true })
        await ProjectCreators.destroy({ where: { ProjectID, UserID }, force: true })
        await UserRequests.destroy({ where: { ProjectID,UserID }, force: true })
    } catch (_) {
        return false;
    }

}
export const deleteUsersFromProject = async (ProjectID: string) => {
    try {
        await UsersProjects.destroy({ where: { ProjectID }, force: true })
        await ProjectCreators.destroy({ where: { ProjectID }, force: true })
        await UserRequests.destroy({ where: { ProjectID }, force: true })
        return true;
    } catch (_) {
        return false;
    }
}