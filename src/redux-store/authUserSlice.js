import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userAPI from "../services/users";

const initialState = {
  data: {},
  status: "",
  error: null
};

export const fetchAuthUser = createAsyncThunk(
  "authUser/fetch",
  async (token) => {
    const response = await userAPI.getAuthenticatedUser(token);
    return response.data;
  }
);

const authUserSlice = createSlice({
  name: "authUser",
  initialState: initialState,
  extraReducers: {
    [fetchAuthUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAuthUser.fulfilled]: (state, action) => {
      const data = action.payload ? action.payload : { role: "UNASSIGNED" };

      state.status = "succeeded";
      state.data = data;
    },
    [fetchAuthUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});

export default authUserSlice.reducer;