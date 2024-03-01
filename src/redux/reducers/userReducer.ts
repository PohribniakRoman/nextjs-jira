import { User } from "@/storage/models/Users"

const intitialState = {
    createdAt: new Date(),
    name: "",
    surname: "",
    email: "",
    UserID: -1,
} as User;

export type UserAction = {
    type: "LOAD_USER",
    payload: User,
}

export const userReducer = (state = intitialState, action: UserAction) => {
    switch (action.type) {
        case "LOAD_USER": {
            return state = action.payload;
        }
        default: {
            return state;
        }
    }
}