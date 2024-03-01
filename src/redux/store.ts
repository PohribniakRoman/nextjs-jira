import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer"

export const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
    })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
