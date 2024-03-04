import { Project } from "@/storage/models/Projects";

const intitialState = {
    createdAt: new Date(),
    title: "",
    description: "",
    archived:false,
    isAdmin:false,
} as Project & {isAdmin:boolean,isOwner:boolean};

export type UserAction = {
    type: "LOAD_PROJECT",
    payload: Project & {isAdmin:boolean,isOwner:boolean},
}

export const projectReducer = (state = intitialState, action: UserAction) => {
    switch (action.type) {
        case "LOAD_PROJECT": {
            return state = action.payload;
        }
        default: {
            return state;
        }
    }
}