import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./projectSlice";
import defectReducer from "./defectSlice";
import userReducer from "./userSlice";
import defectFilterReducer from "./defectFilterReducer";

export default configureStore({
  reducer: {
    projects: projectReducer,
    defects: defectReducer,
    users: userReducer,
    defectFilter: defectFilterReducer
  }
});