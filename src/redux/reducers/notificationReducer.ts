import { v4 } from "uuid";

export interface NotificationType {
    date: string;
    message: string;
    id: string;
    variant: string;
}

const defaultState: NotificationType[] = [];

interface Action {
    type: "NEW_NOTIFICATION" | "THROW_NOTIFICATION";
    payload: NotificationType;
}

export const notificationReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case "NEW_NOTIFICATION": {
            return [...state, { message: action.payload.message, date: new Date().getTime(), id: v4(), variant: action.payload.variant }];
        }
        case "THROW_NOTIFICATION": {
            return [...state.filter(message => message.id !== action.payload.id)]
        }
        default: {
            return state;
        }
    }
}