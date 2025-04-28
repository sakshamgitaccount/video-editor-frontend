"use client";

import UploadZone from "@/components/ui/UploadZone";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, increment } from "@/lib/store";
import { Button } from "@/components/ui/button";
import TimelineStrip from "@/components/ui/TimelineStrip";
import AudioManager from "@/components/ui/AudioManager";
import SubtitleEditor from "@/components/SubtitleEditor";
import TextOverlayEditor from "@/components/TextOverlayEditor";
import ImageOverlay from "@/components/ImageOverlay";
import PreviewPlayer from "@/components/PreviewPlayer ";
import RenderControls from "@/components/RenderControls";

export default function Page() {
  const count = useSelector((s: RootState) => s.test.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="p-6 space-y-8">
      <UploadZone />
      <TimelineStrip />
      <AudioManager />
      <SubtitleEditor />
      <TextOverlayEditor />
      <ImageOverlay />
      <PreviewPlayer />
      <RenderControls />
      <div className="pt-6 border-t">
        <h2 className="text-xl">Redux Test</h2>
        <p>Count: {count}</p>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
      </div>
    </div>
  );
}
