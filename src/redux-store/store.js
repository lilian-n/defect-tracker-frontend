import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from "./authUserSlice";
import projectReducer from "./projectSlice";
import defectReducer from "./defectSlice";
import userReducer from "./userSlice";
import defectFilterReducer from "./defectFilterReducer";

export default configureStore({
  reducer: {
    authUser: authUserReducer,
    projects: projectReducer,
    defects: defectReducer,
    users: userReducer,
    defectFilter: defectFilterReducer
  }
});