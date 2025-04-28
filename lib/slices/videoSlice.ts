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
    // call this when a new file is dropped to reset progress & thumbnail
    startUpload(state) {
      state.uploadProgress = 0;
      state.thumbnailUrl = "";
    },
    // update the simulated upload %
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
    // store the preview URL once “uploaded”
    setThumbnailUrl(state, action: PayloadAction<string>) {
      state.thumbnailUrl = action.payload;
    },
  },
});

export const { startUpload, setUploadProgress, setThumbnailUrl } = videoSlice.actions;
export default videoSlice.reducer;
