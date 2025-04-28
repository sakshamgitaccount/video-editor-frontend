// lib/store.ts
import { configureStore, createSlice } from "@reduxjs/toolkit";
import videoReducer from "./slices/videoSlice";
import timelineReducer from "./slices/timelineSlice";
import audioReducer from "./slices/audioSlice";
import subtitleReducer from "./slices/subtitleSlice";
import textOverlayReducer from "./slices/textOverlaySlice";
import imageOverlayReducer from "./slices/imageOverlaySlice";

const testSlice = createSlice({
  name: "test",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = testSlice.actions;

export const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    video: videoReducer,
    timeline: timelineReducer,
    audio: audioReducer,
    subtitle: subtitleReducer,
    textOverlay: textOverlayReducer,
    imageOverlay: imageOverlayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
