import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { normalize } from "normalizr";

import { userSchema } from "./schemas";
import userAPI from "../services/users";

const userAdapter = createEntityAdapter();

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (token) => {
    const response = await userAPI.getAll(token);
    const normalized = normalize(response.data, [userSchema]);

    return normalized.entities;
  }
);

export const addNewUser = createAsyncThunk(
  "users/add",
  async (newUserValues) => {
    const { token, ...userValues } = newUserValues;
    const response = await userAPI.create(userValues, token);

    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: userAdapter.getInitialState({
    status: "idle",
    error: null
  }),
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      userAdapter.setAll(state, action.payload.users);
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewUser.fulfilled]: (state, action) => {
      userAdapter.addOne(state, action.payload);
    }
  }
});

export default userSlice.reducer;

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers
} = userAdapter.getSelectors(state => state.users);