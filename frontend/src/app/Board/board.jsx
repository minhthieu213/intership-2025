"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useColumns,
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useUpdateColumnOrder,
  useUpdateTaskOrder,
} from "@/utils/request.jsx";

import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import Column from "@/app/Board/Column/column";
import Card from "./Column/Card/card";
import { useRouter } from "next/navigation";

export default function Board() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const inputRef = useRef(null);
  const [orderColumn, setOrderColumn] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [OldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  const { data: columnsData = [], isLoading, error } = useColumns();
  const { data: tasksData = [] } = useTasks();

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const updateColumnOrderMutation = useUpdateColumnOrder();
  const updateTaskOrderMutation = useUpdateTaskOrder();

  const router = useRouter();

  const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
    CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
  };

  const sortedTasks = useMemo(() => {
    return [...tasksData].sort((a, b) => a.orderTask - b.orderTask);
  }, [tasksData]);

  useEffect(() => {
    if (columnsData.length > 0) {
      setOrderColumn(columnsData.map((col) => col.id));
    }
  }, [columnsData]);

  const handleShowInput = (status, task = null) => {
    setCurrentStatus(status);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCurrentTaskId(task.id);
    } else {
      setTitle("");
      setDescription("");
      setCurrentTaskId(null);
    }
    setDialogOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleOnChangeTitle = (e) => setTitle(e.target.value);
  const handleOnChangeDescription = (e) => setDescription(e.target.value);

  const handleAddOrUpdateTask = async () => {
    if (!title.trim() || !description.trim()) return;

    const newTask = {
      title,
      description,
      columnId: currentStatus,
    };

    try {
      if (currentTaskId) {
        await updateTaskMutation.mutateAsync({ id: currentTaskId, ...newTask });
      } else {
        await createTaskMutation.mutateAsync(newTask);
      }
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }

    setTitle("");
    setDescription("");
    setDialogOpen(false);
    setCurrentTaskId(null);
  };

  const handleRemoveTask = async (id) => {
    try {
      await deleteTaskMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const findColumnByCardId = (cardId) => {
    const task = tasksData.find((task) => task.id?.toString() === cardId);
    if (!task) return null;
    return columnsData.find((column) => column.id === task.columnId);
  };

  // Drag start
  const handleDragStart = (event) => {
    const { active } = event;
    const activeColumn = columnsData.find((col) => col.id === active.id);

    setActiveDragItemId(active.id);
    setActiveDragItemType(
      activeColumn ? ACTIVE_DRAG_ITEM_TYPE.COLUMN : ACTIVE_DRAG_ITEM_TYPE.CARD
    );

    if (activeColumn) {
      setActiveDragItemData({
        ...activeColumn,
        id: activeColumn.id,
        name: activeColumn.name,
        description: activeColumn.description,
      });
    } else {
      setActiveDragItemData(event?.active?.data?.current);
      const cardColumn = findColumnByCardId(active.id);
      setOldColumnWhenDraggingCard(cardColumn);
    }
  };

  // is dragging
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
  };

  // Drag End
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;

      const overColumn = columnsData.find((col) => col.id === over.id);
      if (overColumn) {
        const tasksInTargetColumn = sortedTasks.filter(
          (task) => task.columnId === overColumn.id
        );

        const newOrder =
          tasksInTargetColumn.length > 0
            ? Math.max(...tasksInTargetColumn.map((t) => t.orderTask)) + 1
            : 1;

        try {
          await updateTaskMutation.mutateAsync({
            id: parseInt(activeDraggingCardId),
            columnId: overColumn.id,
            title: activeDraggingCardData.title,
            description: activeDraggingCardData.description,
            orderTask: newOrder,
          });
        } catch (error) {
          console.error("Failed to update task:", error);
        }
        return;
      }

      // Trường hợp kéo vào card khác
      const { id: overCardId } = over;
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overCardColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overCardColumn) return;

      // Lấy danh sách tasks trong cột đích và sắp xếp theo orderTask
      const tasksInTargetColumn = sortedTasks.filter(
        (task) => task.columnId === overCardColumn.id
      );

      // Tìm vị trí của card đích
      const overTask = tasksInTargetColumn.find(
        (task) => task.id.toString() === overCardId
      );
      const overTaskIndex = tasksInTargetColumn.findIndex(
        (task) => task.id.toString() === overCardId
      );

      // Tính toán order mới
      let newOrder;
      if (overTaskIndex === 0) {
        // Nếu kéo lên đầu
        newOrder = overTask.orderTask - 1;
      } else if (overTaskIndex === tasksInTargetColumn.length - 1) {
        // Nếu kéo xuống cuối
        newOrder = overTask.orderTask + 1;
      } else {
        // Nếu kéo vào giữa, lấy trung bình của order trước và sau
        const nextTask = tasksInTargetColumn[overTaskIndex + 1];
        newOrder = (overTask.orderTask + nextTask.orderTask) / 2;
      }

      try {
        // Cập nhật order mới
        await updateTaskOrderMutation.mutateAsync({
          taskId: parseInt(activeDraggingCardId),
          newOrder: newOrder,
        });

        // Nếu đổi cột thì cập nhật columnId
        if (OldColumnWhenDraggingCard.id !== overCardColumn.id) {
          await updateTaskMutation.mutateAsync({
            id: parseInt(activeDraggingCardId),
            columnId: overCardColumn.id,
            title: activeDraggingCardData.title,
            description: activeDraggingCardData.description,
          });
        }
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      const activeId = active.id;
      const overId = over.id;

      if (!activeId || !overId) return;

      if (orderColumn.includes(activeId) && orderColumn.includes(overId)) {
        const oldColumnIndex = orderColumn.findIndex((id) => id === activeId);
        const newColumnIndex = orderColumn.findIndex((id) => id === overId);

        const newOrderColumn = arrayMove(
          orderColumn,
          oldColumnIndex,
          newColumnIndex
        );
        setOrderColumn(newOrderColumn);

        try {
          await updateColumnOrderMutation.mutateAsync(newOrderColumn);
        } catch (error) {
          console.error("Failed to update column order:", error);
          setOrderColumn(orderColumn);
        }
        return;
      }

      const activeTask = tasksData.find(
        (task) => task.id?.toString() === activeId
      );
      const overColumn = columnsData.find((col) => col.id === overId);

      if (activeTask && overColumn) {
        const tasksInTargetColumn = tasksData.filter(
          (task) => task.columnId === overColumn.id
        );
        const newOrder = tasksInTargetColumn.length;

        try {
          await updateTaskOrderMutation.mutateAsync({
            taskId: activeTask.id,
            newColumnId: overColumn.id,
            newOrder: newOrder,
          });
        } catch (error) {
          console.error("Failed to update task order:", error);
        }
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  console.log("activeDataItemId: ", activeDragItemId);
  console.log("activeDataItemType: ", activeDragItemType);
  console.log("activeDataItemData: ", activeDragItemData);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching columns</div>;

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderColumn}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex gap-4 p-4 relative">
          {orderColumn.map((colId) => {
            const column = columnsData.find((c) => c.id === colId);
            const columnTasks = sortedTasks.filter(
              (task) => task.columnId === column?.id
            );
            return column ? (
              <Column
                column={column}
                id={column.id}
                key={column.id}
                title={column.name}
                description={column.description || ""}
                tasks={columnTasks.map((task) => ({
                  ...task,
                  id: task.id?.toString(),
                }))}
                numberTask={columnTasks.length}
                onAddItemClick={() => handleShowInput(column.id)}
                onEditTask={(task) => handleShowInput(column.id, task)}
                onRemoveTask={handleRemoveTask}
              />
            ) : null;
          })}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild onPointerDown={(e) => e.stopPropagation()}>
              <Button ref={inputRef} variant="outline" className="hidden">
                Open Dialog
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[500px]"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <DialogHeader>
                <DialogTitle>
                  {currentTaskId ? "Edit Task" : "Create new task"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={handleOnChangeTitle}
                    className="col-span-3"
                    ref={inputRef}
                    onPointerDown={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={handleOnChangeDescription}
                    className="col-span-3"
                    onPointerDown={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleAddOrUpdateTask}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {currentTaskId ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SortableContext>
      <DragOverlay>
        {!activeDragItemType && null}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
          <Column
            id={activeDragItemData?.id}
            title={activeDragItemData?.name}
            description={activeDragItemData?.description || ""}
            tasks={sortedTasks
              .filter((task) => task.columnId === activeDragItemData?.id)
              .map((task) => ({
                ...task,
                id: task.id?.toString(),
              }))}
            numberTask={
              sortedTasks.filter(
                (task) => task.columnId === activeDragItemData?.id
              ).length
            }
            column={activeDragItemData}
            onAddItemClick={() => {}}
            onEditTask={() => {}}
            onRemoveTask={() => {}}
          />
        )}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
          <Card
            id={activeDragItemData?.id}
            title={activeDragItemData?.title}
            description={activeDragItemData?.description}
            status={
              columnsData.find((col) => col.id === activeDragItemData?.columnId)
                ?.name
            }
            task={activeDragItemData}
          />
        )}
      </DragOverlay>
      <div className="fixed bottom-5 right-5">
        <Button
          variant="outline"
          className="bg-[#bdc3c7] text-white hover:bg-[#95a5a6] rounded-[40%]"
          onClick={() => router.push("/about")}
        >
          About
        </Button>
      </div>
    </DndContext>
  );
}
