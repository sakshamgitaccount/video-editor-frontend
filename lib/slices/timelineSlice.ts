import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface Scene {
  id: string;
  label: string;
  duration: number;   
}

interface TimelineState {
  scenes: Scene[];
}

const initialState: TimelineState = {
  scenes: [], 
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    addScene: {
      reducer(state, action: PayloadAction<Scene>) {
        state.scenes.push(action.payload);
      },
      prepare(label: string, duration: number) {
        return {
          payload: { id: nanoid(), label, duration },
        };
      },
    },
    moveScene(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const [moved] = state.scenes.splice(from, 1);
      state.scenes.splice(to, 0, moved);
    },
    removeScene(state, action: PayloadAction<string>) {
      state.scenes = state.scenes.filter(s => s.id !== action.payload);
    },
  },
});

export const { addScene, moveScene, removeScene } = timelineSlice.actions;
export default timelineSlice.reducer;
