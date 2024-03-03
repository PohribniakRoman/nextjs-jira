import { Project } from "@/storage/models/Projects";

const intitialState = {
    createdAt: new Date(),
    title: "",
    description: "",
    archived:false,
} as Project;

export type UserAction = {
    type: "LOAD_PROJECT",
    payload: Project,
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