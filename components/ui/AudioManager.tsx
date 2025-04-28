"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { addClip, toggleMute } from "@/lib/slices/audioSlice";
import { Button } from "@/components/ui/button";

export default function AudioManager() {
  const dispatch = useDispatch<AppDispatch>();
  const segments = useSelector((s: RootState) => s.audio.segments);

  const handleAddBGM = () => {
    dispatch(addClip("BGM", 0, 30)); // 30s of stubbed background music
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-lg font-medium">Audio Manager</h2>

      <Button onClick={handleAddBGM}>Add Background Music</Button>

      <div className="space-y-2">
        {segments.length === 0 ? (
          <p className="text-gray-500">No audio segments yet.</p>
        ) : (
          segments.map(seg => (
            <div
              key={seg.id}
              className="flex items-center space-x-4 p-2 bg-gray-50 rounded"
            >
              {/* Mock waveform as a gray bar */}
              <div className="flex-1 h-6 bg-gray-200 rounded overflow-hidden">
                <div
                  className={`h-full ${
                    seg.muted ? "bg-red-400" : "bg-green-400"
                  }`}
                  style={{ width: `${(seg.duration / 60) * 100}%` }}
                />
              </div>
              <span className="w-24">{seg.label}</span>
              <Button
                variant="outline"
                onClick={() => dispatch(toggleMute(seg.id))}
                className="px-2 py-1 text-sm"
              >
                {seg.muted ? "Unmute" : "Mute"}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
