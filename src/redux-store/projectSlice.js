import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector
} from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import { projectSchema } from "./schemas";
import projectAPI from "../services/projects";

const projectAdapter = createEntityAdapter();

export const fetchAllProjects = createAsyncThunk(
  "projects/fetchAll",
  async (token) => {
    const response = await projectAPI.getAll(token);
    const normalized = normalize(response.data, [projectSchema]);
    return normalized.entities;
  }
);

// function may break due to the parameters of createAsyncThunk
// may make more sense if the normalized function worked instead of manually
// tacking on user array
export const addProject = createAsyncThunk(
  "projects/add",
  async (newProject, token) => {
    const response = await projectAPI.create(newProject, token);
    const projectToAdd = {
      ...response.data,
      users: []
    };
    return projectToAdd;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: projectAdapter.getInitialState({
    status: "idle",
    error: null
  }),
  reducers: {},
  extraReducers: {
    [fetchAllProjects.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAllProjects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      projectAdapter.setAll(state, action.payload.projects);
    },
    [fetchAllProjects.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addProject.fulfilled]: (state, action) => {
      projectAdapter.addOne(state, action.payload);
    },
    [addProject.rejected]: (state, action) => {
      state.error = action.error.message;
    }
  }
})

export default projectSlice.reducer;

export const {
  selectById: selectProjectById,
  selectIds: selectProjectIds,
  selectEntities: selectProjectEntities,
  selectAll: selectAllProjects,
  selectTotal: selectTotalProjects
} = projectAdapter.getSelectors(state => state.projects);