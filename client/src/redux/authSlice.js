import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get user from localStorage
const token = localStorage.getItem("token");
console.log("this is the ", token);

// Register / sign up new user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        userData
      );
      console.log(response);
      if (registerUser.data) {
        const register = localStorage.setItem("token", response.data.token);
        console.log("this is registration from redux", register);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: token || null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
  },
});

export default authSlice.reducer;
