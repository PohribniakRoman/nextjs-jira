import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer"
import { projectReducer } from "./reducers/projectReducer"
import { notificationReducer } from "./reducers/notificationReducer"

export const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        project: projectReducer,
        notification: notificationReducer,
    })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
