import Users, { User } from "@/storage/models/Users";

export const getUserByID = async (UserID:string) => (await Users.findOne({where:{UserID}}))?.dataValues as User;  
