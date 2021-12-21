import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./generalSlice";
import ideaReducer from './ideaSlice'
import modalReducer from './modalSlices'
import userReducer from './userSlice'
 
export default configureStore({
    reducer: {
        ideas: ideaReducer,
        modal: modalReducer,
        general: generalReducer,
        user: userReducer
    }
})

