import React from "react";
import HeadColumn from "./head_column";
import Card from "./Card/card";
import FootColumn from "./foot_column";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Underdog } from "next/font/google";

export default function Column({
  title,
  description,
  tasks = [],
  numberTask,
  onAddItemClick,
  onRemoveTask,
  onEditTask,
  id,
  column,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { ...column } });

  const DndKitColumnstyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={DndKitColumnstyle}
      {...attributes}
      {...listeners}
      className="flex flex-col min-w-xs min-h-[500px] border-[1px] border-gray-300 rounded-lg bg-gray-100"
    >
      <HeadColumn
        title={title}
        description={description}
        numberTask={numberTask}
        className="flex-none"
      />
      <SortableContext
        items={(tasks || []).map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 overflow-y-auto">
          {(tasks || []).map((task) => {
            return (
              <Card
                task={task}
                key={task.id}
                status={title}
                id={task.id}
                title={task.title}
                description={task.description}
                onEdit={onEditTask}
                onRemove={onRemoveTask}
              />
            );
          })}
        </div>
      </SortableContext>
      <FootColumn
        className="mt-2"
        onClick={(e) => {
          e.stopPropagation();
          onAddItemClick();
        }}
      />
    </div>
  );
}
