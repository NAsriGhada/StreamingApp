import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get user from localStorage
// const token = localStorage.getItem("token");
// console.log("this is the ", token);

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
      if (response.data) {
        const register = localStorage.setItem("token", response.data.token);
        console.log("this is registration from redux", register);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        userData
      );
      console.log("coming from redux login", response);
      if (response.data) {
        const login = localStorage.setItem("token", response.data.token);
        console.log("this is login from redux", login);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Using getState within a createAsyncThunk allows you to access the current state of the Redux store, including the authentication state where the token might be stored. This approach promotes cleaner code by avoiding repetition and direct dependency on localStorage within each thunk that requires the token. It centralizes the token management within the Redux state, making your application's data flow easier to understand and maintain.
// Get the current authenticated user
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async ({ getState, rejectWithValue }) => {
    // Retrieve the token directly inside the thunk to ensure it's current
    //  const { token } = getState().auth;
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token found");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/current",
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log(response);
      return response.data; // Assuming this includes user details
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  user: null,
  // token: token || null,
  // token: localStorage.getItem("token"),
  token: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register
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
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      // state.error = action.payload.error;
      state.error = action.error;
    });
    // Handle fetchCurrentUser
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the state with the user data
        console.log(action)
        state.user = action.payload; // Make sure the payload structure matches what you expect
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
    // logout
    builder.addCase(logoutUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = null;
      state.token = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
  },
});
console.log(authSlice);

export default authSlice.reducer;
