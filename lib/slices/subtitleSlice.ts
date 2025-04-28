import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface SubtitleBlock {
  id: string;
  text: string;
  start: number; 
  end: number;  
  fontSize: number;
  color: string;
  position: "bottom" | "top" | "center";
}

interface SubtitleState {
  blocks: SubtitleBlock[];
}

const initialState: SubtitleState = {
  blocks: [],
};

const subtitleSlice = createSlice({
  name: "subtitle",
  initialState,
  reducers: {
    addBlock: {
      reducer(state, action: PayloadAction<SubtitleBlock>) {
        state.blocks.push(action.payload);
      },
      prepare() {
        return {
          payload: {
            id: nanoid(),
            text: "",
            start: 0,
            end: 3,
            fontSize: 16,
            color: "#FFFFFF",
            position: "bottom" as const,
          },
        };
      },
    },
    updateBlock(
      state,
      action: PayloadAction<Partial<Omit<SubtitleBlock, "id">> & { id: string }>
    ) {
      const blk = state.blocks.find(b => b.id === action.payload.id);
      if (blk) Object.assign(blk, action.payload);
    },
    removeBlock(state, action: PayloadAction<string>) {
      state.blocks = state.blocks.filter(b => b.id !== action.payload);
    },
  },
});

export const { addBlock, updateBlock, removeBlock } = subtitleSlice.actions;
export default subtitleSlice.reducer;
