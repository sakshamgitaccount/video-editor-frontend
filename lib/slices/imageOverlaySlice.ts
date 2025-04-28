// lib/slices/imageOverlaySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface ImageOverlay {
  id: string;
  src: string;      // object URL
  x: number;        // % position
  y: number;
  width: number;    // % of video width
  height: number;   // % of video height
  opacity: number;  // 0–1
}

interface ImageOverlayState {
  items: ImageOverlay[];
}

const initialState: ImageOverlayState = { items: [] };

const slice = createSlice({
  name: "imageOverlay",
  initialState,
  reducers: {
    addImageOverlay: {
      reducer(state, action: PayloadAction<ImageOverlay>) {
        state.items.push(action.payload);
      },
      prepare(src: string) {
        return {
          payload: {
            id: nanoid(),
            src,
            x: 10,
            y: 10,
            width: 20,
            height: 20,
            opacity: 1,
          } as ImageOverlay,
        };
      },
    },
    updateImageOverlay(
      state,
      action: PayloadAction<Partial<Omit<ImageOverlay, "id">> & { id: string }>
    ) {
      const img = state.items.find(i => i.id === action.payload.id);
      if (img) Object.assign(img, action.payload);
    },
    removeImageOverlay(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const {
  addImageOverlay,
  updateImageOverlay,
  removeImageOverlay,
} = slice.actions;
export default slice.reducer;
