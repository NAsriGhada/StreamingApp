import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { getState, rejectWithValue }) => {
    // Retrieve the token directly inside the thunk to ensure it's current
    const { token } = getState().auth;
    // const token = localStorage.getItem("token");
    // const token = getState().auth.token;
    console.log(token, "admins token");
    if (!token) return rejectWithValue("No token found");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/all-users",
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log("response", response);
      return response.data; // Assuming this includes all users
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { getState, rejectWithValue, dispatch }) => {
    const { token } = getState().auth;
    if (!token) return rejectWithValue("No token found");
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin//delete/user/video/${userId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log("delete response", response);
      // Refetch all users after a successful delete
      dispatch(fetchAllUsers());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  users: [],
  // token: localStorage.getItem("token"),
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ! fetch all users
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      console.log("Fulfilled state:", state);
      console.log("Fulfilled action:", action);
      state.status = "succeeded";
      state.users = action.payload.allUsers;
      // state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
    // ! delete a user
    // ! No need for a deleteUser.fulfilled case if it's just refetching users
    // !  you technically don't need to add specific handling for the deleteUser.fulfilled case in your reducers to update the users list. This is because the subsequent call to fetchAllUsers should fetch the updated list of users from the server, reflecting any changes including the deletion.
    // ! However, you should still handle the possible outcomes of the deleteUser action in your reducer to manage the state related to the deletion process itself, such as updating loading status or handling errors.
    builder.addCase(deleteUser.pending, (state) => {
      state.status = "loading";
    });
    // builder.addCase(deleteUser.fulfilled, (state, action) => {
    //   console.log("Fulfilled state:", state);
    //   console.log("Fulfilled action:", action);
    //   state.status = "succeeded";
    //   state.users = action.payload;
    // });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});
// console.log("admin slice", adminSlice);

export default adminSlice.reducer;
