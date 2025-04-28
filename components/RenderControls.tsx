"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RenderControls() {
  const [isRendering, setIsRendering] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const handleRender = () => {
    setIsRendering(true);
    setDownloadUrl("");

    setTimeout(() => {
      const fakeUrl = URL.createObjectURL(new Blob([]));
      setDownloadUrl(fakeUrl);
      setIsRendering(false);
    }, 3000);
  };

  return (
    <div className="mt-6 p-4 bg-white rounded shadow flex items-center space-x-4">
      <Button disabled={isRendering} onClick={handleRender}>
        {isRendering ? "Rendering…" : "Render Video"}
      </Button>

      {isRendering && <span className="italic">Rendering in progress…</span>}

      {!isRendering && downloadUrl && (
        <a
          href={downloadUrl}
          download="edited-video.mp4"
          className="underline text-blue-600"
        >
          Download Video
        </a>
      )}
    </div>
  );
}
