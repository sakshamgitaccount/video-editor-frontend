import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface TextOverlay {
  id: string;
  text: string;
  fontSize: number;
  color: string;
  x: number;       // percentage [0–100]
  y: number;       // percentage [0–100]
}

interface TextOverlayState {
  overlays: TextOverlay[];
}

const initialState: TextOverlayState = { overlays: [] };

const textOverlaySlice = createSlice({
  name: "textOverlay",
  initialState,
  reducers: {
    addOverlay: {
      reducer(state, action: PayloadAction<TextOverlay>) {
        state.overlays.push(action.payload);
      },
      prepare() {
        return {
          payload: {
            id: nanoid(),
            text: "New Text",
            fontSize: 24,
            color: "#FFFFFF",
            x: 50,
            y: 50,
          },
        };
      },
    },
    updateOverlay(
      state,
      action: PayloadAction<Partial<Omit<TextOverlay, "id">> & { id: string }>
    ) {
      const ov = state.overlays.find(o => o.id === action.payload.id);
      if (ov) Object.assign(ov, action.payload);
    },
    removeOverlay(state, action: PayloadAction<string>) {
      state.overlays = state.overlays.filter(o => o.id !== action.payload);
    },
  },
});

export const { addOverlay, updateOverlay, removeOverlay } = textOverlaySlice.actions;
export default textOverlaySlice.reducer;
