import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllVideos = createAsyncThunk(
  "video/fetchAllVideos",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token found");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/video/all/videos",
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

export const uploadVideos = createAsyncThunk(
  "video/createVideos",
  async (formData, { getState, rejectWithValue, dispatch }) => {
    // const token = localStorage.getItem("token");
    const token = getState().auth.token;
    // const token = getState().video.token;
    console.log("uploading based on roles", token);
    if (!token) return rejectWithValue("No token found");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/video/videos/upload",
        formData,
        {
          headers: { Authorization: `${token}` },
          // since its a file not just a text
          // "Content-Type": "multipart/form-data",
        }
      );
      console.log("response from video redux", response);
      dispatch(fetchAllVideos());
      // navigate("/profile")
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  video: null,
  videos: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all videos
    builder.addCase(fetchAllVideos.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllVideos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.videos = action.payload.videos;
    });
    builder.addCase(fetchAllVideos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
    //   create videos
    builder.addCase(uploadVideos.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(uploadVideos.fulfilled, (state, action) => {
      console.log(state);
      console.log(action);
      state.status = "succeeded";
      console.log(action.payload)
      state.video = action.payload;
      state.token = action.payload;
    });
    builder.addCase(uploadVideos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});
console.log(videoSlice);

export default videoSlice.reducer;
