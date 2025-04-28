"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import {
  startUpload,
  setUploadProgress,
  setThumbnailUrl,
} from "@/lib/slices/videoSlice";

export default function UploadZone() {
  const dispatch = useDispatch<AppDispatch>();
  const { uploadProgress, thumbnailUrl } = useSelector(
    (state: RootState) => state.video
  );

  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      dispatch(startUpload());
      let prog = 0;
      const iv = setInterval(() => {
        prog += 10;
        dispatch(setUploadProgress(Math.min(prog, 100)));
        if (prog >= 100) {
          clearInterval(iv);
          const url = URL.createObjectURL(file);
          dispatch(setThumbnailUrl(url));
        }
      }, 200);
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 rounded p-6 text-center hover:border-gray-600 cursor-pointer"
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop your video here…</p>
      ) : (
        <p>Drag & drop a video, or click to select</p>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="mt-1 text-sm">{uploadProgress}%</p>
        </div>
      )}

      {uploadProgress === 100 && thumbnailUrl && (
        <div className="mt-4">
          <p className="text-sm mb-2">Upload complete!</p>
          <video
            src={thumbnailUrl}
            controls
            className="max-w-full h-auto rounded"
          />
        </div>
      )}
    </div>
  );
}
