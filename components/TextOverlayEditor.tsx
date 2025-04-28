"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import {
  addOverlay,
  updateOverlay,
  removeOverlay,
} from "@/lib/slices/textOverlaySlice";
import { Button } from "@/components/ui/button";

export default function TextOverlayEditor() {
  const dispatch = useDispatch<AppDispatch>();
  const overlays = useSelector((s: RootState) => s.textOverlay.overlays);

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-lg font-medium">Text Overlays</h2>
      <Button onClick={() => dispatch(addOverlay())}>Add Text Overlay</Button>

      <div className="space-y-4">
        {overlays.length === 0 && (
          <p className="text-gray-500">No text overlays yet.</p>
        )}

        {overlays.map(ov => (
          <div key={ov.id} className="space-y-2 p-3 bg-gray-50 rounded">
            <div className="flex space-x-2 items-start">
              <input
                type="text"
                value={ov.text}
                onChange={e =>
                  dispatch(updateOverlay({ id: ov.id, text: e.target.value }))
                }
                className="flex-1 border rounded p-1"
              />
              <Button
                variant="outline"
                onClick={() => dispatch(removeOverlay(ov.id))}
              >
                Delete
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <label className="flex items-center">
                Size:
                <input
                  type="number"
                  min={8}
                  value={ov.fontSize}
                  onChange={e =>
                    dispatch(
                      updateOverlay({ id: ov.id, fontSize: +e.target.value })
                    )
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>
              <label className="flex items-center">
                Color:
                <input
                  type="color"
                  value={ov.color}
                  onChange={e =>
                    dispatch(updateOverlay({ id: ov.id, color: e.target.value }))
                  }
                  className="ml-1 p-1"
                />
              </label>
              <label className="flex items-center">
                X%:
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={ov.x}
                  onChange={e =>
                    dispatch(updateOverlay({ id: ov.id, x: +e.target.value }))
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>
              <label className="flex items-center">
                Y%:
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={ov.y}
                  onChange={e =>
                    dispatch(updateOverlay({ id: ov.id, y: +e.target.value }))
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
