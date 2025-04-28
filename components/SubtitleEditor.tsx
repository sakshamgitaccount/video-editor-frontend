"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import {
  addBlock,
  updateBlock,
  removeBlock,
} from "@/lib/slices/subtitleSlice";
import { Button } from "@/components/ui/button";

export default function SubtitleEditor() {
  const dispatch = useDispatch<AppDispatch>();
  const blocks = useSelector((s: RootState) => s.subtitle.blocks);

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-lg font-medium">Subtitles</h2>
      <Button onClick={() => dispatch(addBlock())}>Add Subtitle</Button>

      <div className="space-y-4">
        {blocks.length === 0 && (
          <p className="text-gray-500">No subtitles yet.</p>
        )}

        {blocks.map(blk => (
          <div
            key={blk.id}
            className="space-y-2 p-3 bg-gray-50 rounded"
          >
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Caption text"
                value={blk.text}
                onChange={e =>
                  dispatch(
                    updateBlock({ id: blk.id, text: e.target.value })
                  )
                }
                className="flex-1 border rounded p-1"
              />
              <Button
                variant="outline"
                onClick={() => dispatch(removeBlock(blk.id))}
              >
                Delete
              </Button>
            </div>

            <div className="flex space-x-2 text-sm">
              <label>
                Start:
                <input
                  type="number"
                  min={0}
                  value={blk.start}
                  onChange={e =>
                    dispatch(
                      updateBlock({
                        id: blk.id,
                        start: Number(e.target.value),
                      })
                    )
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>
              <label>
                End:
                <input
                  type="number"
                  min={0}
                  value={blk.end}
                  onChange={e =>
                    dispatch(
                      updateBlock({
                        id: blk.id,
                        end: Number(e.target.value),
                      })
                    )
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>
              <label>
                Size:
                <input
                  type="number"
                  min={8}
                  value={blk.fontSize}
                  onChange={e =>
                    dispatch(
                      updateBlock({
                        id: blk.id,
                        fontSize: Number(e.target.value),
                      })
                    )
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>
              <label>
                Color:
                <input
                  type="color"
                  value={blk.color}
                  onChange={e =>
                    dispatch(
                      updateBlock({
                        id: blk.id,
                        color: e.target.value,
                      })
                    )
                  }
                  className="ml-1 p-1"
                />
              </label>
              <label>
                Position:
                <select
                  value={blk.position}
                  onChange={e =>
                    dispatch(
                      updateBlock({
                        id: blk.id,
                        position: e.target.value as any,
                      })
                    )
                  }
                  className="ml-1 border rounded p-1"
                >
                  <option value="bottom">Bottom</option>
                  <option value="center">Center</option>
                  <option value="top">Top</option>
                </select>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
