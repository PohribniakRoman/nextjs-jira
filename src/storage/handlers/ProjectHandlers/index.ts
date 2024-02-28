import { parseFindResult } from "@/storage";
import Projects, { Project } from "@/storage/models/Projects";
import { User } from "@/storage/models/Users";
import { getUserByID } from "../UserHandlers";
import UsersProjects from "@/storage/models/UsersProjects";

export const getAllProjects = async () => parseFindResult<Project>(await Projects?.findAll() || []);

export const getProjectUsers = async (ProjectID: string) => parseFindResult<User>(await UsersProjects?.findAll({ where: { ProjectID } }) || []);

export const getProjectByID = async (ProjectID: string) => (await Projects?.findOne({ where: { ProjectID } }))?.dataValues as Project;

export const getProjectUserDetails = async (ProjcetID: string) => {
    const promisList = (await getProjectUsers(ProjcetID)).map(({ UserID }) =>
        getUserByID(UserID)
    )
    return await Promise.all(promisList)
}