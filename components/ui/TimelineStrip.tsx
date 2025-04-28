"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { moveScene, removeScene, addScene } from "@/lib/slices/timelineSlice";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";

interface DraggableSceneProps {
  sceneId: string;
  index: number;
}

const DraggableScene = ({ sceneId, index }: DraggableSceneProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const scene = useSelector((s: RootState) =>
    s.timeline.scenes.find((sc) => sc.id === sceneId)
  )!;

  const [{ isDragging }, drag] = useDrag({
    type: "SCENE",
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: "SCENE",
    hover(item: { index: number }) {
      if (item.index !== index) {
        dispatch(moveScene({ from: item.index, to: index }));
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        drop(node);
        drag(node);
      }}
      className={`p-2 m-1 bg-gray-300 rounded cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ minWidth: 80 }}
    >
      {scene.label}
      <button
        className="ml-2 text-red-600 hover:text-red-800"
        onClick={() => dispatch(removeScene(scene.id))}
      >
        ×
      </button>
    </div>
  );
};

export default function TimelineStrip() {
  const dispatch = useDispatch<AppDispatch>();
  const scenes = useSelector((s: RootState) => s.timeline.scenes);
  const handleAdd = () => {
    const label = `Scene ${scenes.length + 1}`;
    dispatch(addScene(label, 5)); // mock 5s duration
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleAdd}>Add Scene</Button>

      <DndProvider backend={HTML5Backend}>
        <div className="flex overflow-x-auto p-4 bg-gray-100 rounded">
          {scenes.length === 0 ? (
            <p className="text-gray-500">
              No scenes yet. Use “Add Scene” to begin.
            </p>
          ) : (
            scenes.map((sc, idx) => (
              <DraggableScene key={sc.id} sceneId={sc.id} index={idx} />
            ))
          )}
        </div>
      </DndProvider>
    </div>
  );
}
