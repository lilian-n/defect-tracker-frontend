import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector
} from "@reduxjs/toolkit";
import { normalize } from "normalizr";

import { defectSchema } from "./schemas";
import { getUserName } from "./helperFunctions";
import defectAPI from "../services/defects";

const defectAdapter = createEntityAdapter();

export const fetchAllDefects = createAsyncThunk(
  "defects/fetchAll",
  async (token) => {
    const response = await defectAPI.getAll(token);
    const normalized = normalize(response.data, [defectSchema]);

    return normalized.entities;
  }
);

export const fetchDefectsByProject = createAsyncThunk(
  "defects/fetchByProject",
  async (fetchValues) => {
    const { projectId, token } = fetchValues;

    const response = await defectAPI.getByProject(projectId, token);
    const normalized = normalize(response.data, [defectSchema]);

    return normalized.entities;
  }
);

// may have to fix in order to retrieve comments 
export const fetchOneDefect = createAsyncThunk(
  "defects/fetchOne",
  async (fetchValues) => {
    const { defectId, token } = fetchValues;
    const response = await defectAPI.getById(defectId, token);
    const normalized = normalize(response.data, defectSchema);

    return normalized.entities;
  }
);

export const addDefect = createAsyncThunk(
  "defects/add",
  async (newValues) => {
    const { token, ...newDefect } = newValues;

    const response = await defectAPI.create(newDefect, token);
    const defectToAdd = { ...response.data, comments: [] }

    return defectToAdd;
  }
);

export const updateDefect = createAsyncThunk(
  "defects/update",
  async (updateValues, { rejectWithValue }) => {
    const { token, ...updateDefectValues } = updateValues;
    const { id } = updateValues;

    try {
      const response = await defectAPI.update(id, updateDefectValues, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDefect = createAsyncThunk(
  "defects/delete",
  async (deleteValues) => {
    const { token, id } = deleteValues;

    await defectAPI.remove(id, token);

    return deleteValues;
  }
);

const defectSlice = createSlice({
  name: "defects",
  initialState: defectAdapter.getInitialState({
    status: "idle",
    error: null
  }),
  reducers: {},
  extraReducers: {
    [fetchAllDefects.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAllDefects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      defectAdapter.setAll(state, action.payload.defects);
    },
    [fetchAllDefects.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchDefectsByProject.fulfilled]: (state, action) => {
      if (action.payload.defects) {
        defectAdapter.upsertMany(state, action.payload.defects);
      }
    },
    [fetchDefectsByProject.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchOneDefect.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchOneDefect.fulfilled]: (state, action) => {
      state.status = "succeeded";
      defectAdapter.upsertMany(state, action.payload.defects)
    },
    [fetchOneDefect.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addDefect.fulfilled]: (state, action) => {
      defectAdapter.addOne(state, action.payload);
    },
    [addDefect.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [updateDefect.fulfilled]: (state, action) => {
      defectAdapter.upsertOne(state, action.payload)
    },
    [deleteDefect.fulfilled]: (state, action) => {
      defectAdapter.removeOne(state, action.payload.id)
    },
    // include deleteProject action
  }
});

export default defectSlice.reducer;

export const {
  selectById: selectDefectById,
  selectIds: selectDefectIds,
  selectEntities: selectDefectEntities,
  selectAll: selectAllDefects,
  selectTotal: selectTotalDefects
} = defectAdapter.getSelectors(state => state.defects);

export const selectDefect = defectId =>
  createSelector(
    [
      state => selectDefectById(state, defectId),
      state => state.users.ids.map(id => state.users.entities[id])
    ],
    (defect, users) => {
      if (!defect) {
        return null
      }
      const hyrdratedDefect = {
        ...defect,
        identifierId: getUserName(users, defect.identifierId),
        assignedDevId: getUserName(users, defect.assignedDevId)
      };

      return hyrdratedDefect;
    }
  )

// include selectCommentsByDefect 