import { configureStore , Middleware} from "@reduxjs/toolkit";
import thunk ,{ThunkMiddleware} from "redux-thunk";
import { AssignmentSlice } from "./assignmentSlice";

const middlewares: Middleware[] = [thunk as ThunkMiddleware];

const store = configureStore(
    {
        reducer:{
            AssignmentStore: AssignmentSlice.reducer
        },    
        middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(middlewares)
    },
);


export default store
