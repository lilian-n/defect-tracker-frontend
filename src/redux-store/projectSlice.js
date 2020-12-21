import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector
} from "@reduxjs/toolkit";
import { normalize } from "normalizr";

import { addDefect, deleteDefect } from "./defectSlice";
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

export const fetchOneProject = createAsyncThunk(
  "projects/fetchOne",
  async (values) => {
    const { token, projectId } = values;

    const response = await projectAPI.getOne(projectId, token);
    const normalized = normalize(response.data, projectSchema);

    return normalized.entities;
  }
);

// function may break due to the parameters of createAsyncThunk
// may make more sense if the normalized function worked instead of manually
// tacking on user array
export const addProject = createAsyncThunk(
  "projects/add",
  async (newValues) => {
    const { token, ...newProject } = newValues;
    const response = await projectAPI.create(newProject, token);
    const projectToAdd = {
      ...response.data,
      users: []
    };
    return projectToAdd;
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async (updateValues, { rejectWithValue }) => {
    const { id } = updateValues;
    const { token, ...updateProjectValues } = updateValues;

    try {
      const response = await projectAPI.update(id, updateProjectValues, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
    [fetchOneProject.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchOneProject.fulfilled]: (state, action) => {
      state.status = "succeeded";
      projectAdapter.upsertMany(state, action.payload.projects);
    },
    [fetchOneProject.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addProject.fulfilled]: (state, action) => {
      projectAdapter.addOne(state, action.payload);
    },
    [addProject.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [updateProject.fulfilled]: (state, action) => {
      projectAdapter.upsertOne(state, action.payload);
    },
    [addDefect.fulfilled]: (state, action) => {
      const id = action.payload.projectId;
      const defectId = action.payload.id;
      state.entities[id].defects = state.entities[id].defects.concat(defectId);
    },
    [deleteDefect.fulfilled]: (state, action) => {
      const id = action.payload.projectId;
      const defectId = action.payload.id;
      state.entities[id].defects = state.entities[id].defects.filter(id => id !== defectId);
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

export const selectDefectsByProjectId = projectId =>
  createSelector(
    [
      state => selectProjectById(state, projectId),
      state => state.defects.ids.map(id => state.defects.entities[id])
    ],
    (project, defects) => {
      if (!project) {
        return [];
      }

      return Object.keys(defects)
        .map(d => defects[d])
        .filter(defect => project.defects.includes(defect.id));
    }
  );

