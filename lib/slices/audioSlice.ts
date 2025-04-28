import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface AudioSegment {
  id: string;
  label: string;       
  start: number;     
  duration: number;   
  muted: boolean;
}

interface AudioState {
  segments: AudioSegment[];
}

const initialState: AudioState = {
  segments: [],    
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    addClip: {
      reducer(state, action: PayloadAction<AudioSegment>) {
        state.segments.push(action.payload);
      },
      prepare(label: string, start: number, duration: number) {
        return {
          payload: { id: nanoid(), label, start, duration, muted: false },
        };
      },
    },
    toggleMute(state, action: PayloadAction<string>) {
      const seg = state.segments.find(s => s.id === action.payload);
      if (seg) seg.muted = !seg.muted;
    },
  },
});

export const { addClip, toggleMute } = audioSlice.actions;
export default audioSlice.reducer;
