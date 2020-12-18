import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./projectSlice";
import defectReducer from "./defectSlice";
import defectFilterReducer from "./defectFilterReducer";

export default configureStore({
  reducer: {
    projects: projectReducer,
    defects: defectReducer,
    defectFilter: defectFilterReducer
  }
});