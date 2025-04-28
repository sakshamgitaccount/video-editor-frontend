import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
  uploadProgress: number;
  thumbnailUrl: string;
}

const initialState: VideoState = {
  uploadProgress: 0,
  thumbnailUrl: "",
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    startUpload(state) {
      state.uploadProgress = 0;
      state.thumbnailUrl = "";
    },
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
    setThumbnailUrl(state, action: PayloadAction<string>) {
      state.thumbnailUrl = action.payload;
    },
  },
});

export const { startUpload, setUploadProgress, setThumbnailUrl } = videoSlice.actions;
export default videoSlice.reducer;
