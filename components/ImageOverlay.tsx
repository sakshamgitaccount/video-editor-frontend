"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import {
  addImageOverlay,
  updateImageOverlay,
  removeImageOverlay,
} from "@/lib/slices/imageOverlaySlice";
import { Button } from "@/components/ui/button";

export default function ImageOverlay() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((s: RootState) => s.imageOverlay.items);

  // handle image drop
  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      dispatch(addImageOverlay(url));
    },
    [dispatch]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-lg font-medium">Image Overlays</h2>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 text-center ${
          isDragActive ? "border-gray-600" : "border-gray-400"
        } cursor-pointer`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop image here…</p>
        ) : (
          <p>Drag & drop an image, or click to select</p>
        )}
      </div>

      <div className="space-y-4">
        {items.length === 0 && (
          <p className="text-gray-500">No image overlays yet.</p>
        )}
        {items.map(img => (
          <div key={img.id} className="space-y-2 p-2 bg-gray-50 rounded">
            <img src={img.src} className="max-h-32 mb-2" />

            <div className="flex flex-wrap gap-2 text-sm">
              {/** Position X */}
              <label className="flex items-center">
                X%:
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={img.x}
                  onChange={e =>
                    dispatch(
                      updateImageOverlay({ id: img.id, x: +e.target.value })
                    )
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>

              {/** Position Y */}
              <label className="flex items-center">
                Y%:
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={img.y}
                  onChange={e =>
                    dispatch(
                      updateImageOverlay({ id: img.id, y: +e.target.value })
                    )
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>

              {/** Width */}
              <label className="flex items-center">
                W%:
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={img.width}
                  onChange={e =>
                    dispatch(
                      updateImageOverlay({ id: img.id, width: +e.target.value })
                    )
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>

              {/** Height */}
              <label className="flex items-center">
                H%:
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={img.height}
                  onChange={e =>
                    dispatch(
                      updateImageOverlay({ id: img.id, height: +e.target.value })
                    )
                  }
                  className="ml-1 w-16 border rounded p-1"
                />
              </label>

              {/** Opacity */}
              <label className="flex items-center">
                Opacity:
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={img.opacity}
                  onChange={e =>
                    dispatch(
                      updateImageOverlay({ id: img.id, opacity: +e.target.value })
                    )
                  }
                  className="ml-1"
                />
              </label>

              <Button
                variant="outline"
                onClick={() => dispatch(removeImageOverlay(img.id))}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
