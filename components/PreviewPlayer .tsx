// components/PreviewPlayer.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function PreviewPlayer() {
  const videoUrl = useSelector((s: RootState) => s.video.thumbnailUrl);
  const subtitles = useSelector((s: RootState) => s.subtitle.blocks);
  const textOverlays = useSelector((s: RootState) => s.textOverlay.overlays);
  const imageOverlays = useSelector((s: RootState) => s.imageOverlay.items);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // track time for subtitle timing
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTimeUpdate = () => setCurrentTime(vid.currentTime);
    vid.addEventListener("timeupdate", onTimeUpdate);
    return () => vid.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  if (!videoUrl) {
    return <p className="text-gray-500">Upload a video to preview.</p>;
  }

  return (
    <div className="relative max-w-full mx-auto bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full"
      />

      {/* Subtitles */}
      {subtitles.map(sb =>
        currentTime >= sb.start && currentTime <= sb.end ? (
          <div
            key={sb.id}
            className="absolute left-1/2 transform -translate-x-1/2 text-center"
            style={{
              bottom: sb.position === "bottom" ? "5%" :
                      sb.position === "center" ? "45%" : "85%",
              fontSize: sb.fontSize,
              color: sb.color,
            }}
          >
            {sb.text}
          </div>
        ) : null
      )}

      {/* Text Overlays */}
      {textOverlays.map(to => (
        <div
          key={to.id}
          className="absolute"
          style={{
            left: `${to.x}%`,
            top: `${to.y}%`,
            fontSize: to.fontSize,
            color: to.color,
            transform: "translate(-50%, -50%)",
          }}
        >
          {to.text}
        </div>
      ))}

      {/* Image Overlays */}
      {imageOverlays.map(img => (
        <img
          key={img.id}
          src={img.src}
          className="absolute"
          style={{
            left: `${img.x}%`,
            top: `${img.y}%`,
            width: `${img.width}%`,
            height: `${img.height}%`,
            opacity: img.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
