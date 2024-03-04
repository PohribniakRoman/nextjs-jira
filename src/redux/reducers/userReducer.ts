import { User } from "@/storage/models/Users"

const intitialState = {
    createdAt: new Date(),
    name: "",
    surname: "",
    email: "",
    UserID: -1,
    requestCount:0
} as User & {requestCount:number};

export type UserAction = {
    type: "LOAD_USER",
    payload: User & {requestCount:number},
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