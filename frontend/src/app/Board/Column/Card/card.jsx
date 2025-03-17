"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Card({
  id,
  title,
  description,
  status,
  onEdit,
  onRemove,
  task,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const MenuRef = useRef(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const statusClasses = {
    "To Do": "border-green-500 bg-green-200",
    "In Progress": "border-yellow-500 bg-yellow-200",
    Done: "border-purple-500 bg-purple-200",
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    if (!isOpen) {
      setIsFocus(false);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsFocus(true);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleClickOutside = (e) => {
    if (MenuRef.current && !MenuRef.current.contains(e.target)) {
      setIsOpen(false);
      setIsFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { ...task } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #3498db" : undefined,
  };

  const handleDelete = () => {
    onRemove(id);
    setShowDeleteDialog(false);
    setIsOpen(false);
    console.log("Remove dialog");
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`mx-4 py-3 bg-white border-[1px] shadow-md border-gray-300 rounded-lg mt-3 hover:cursor-grab relative ${
          isFocus ? "border-blue-400" : ""
        }`}
      >
        <div className="flex justify-start items-center min-w-[340px] gap-x-2 px-2">
          <div className="flex items-center gap-1 justify-center select-none h-6">
            <div
              className={`rounded-[50%] border-2 ${statusClasses[status]} w-4 h-4`}
            ></div>
            <div className="text-sm text-gray-600">{title}</div>
            <div className="text-sm text-gray-600 mr-1">#{id}</div>
            <DropdownMenu open={isOpen}>
              <DropdownMenuTrigger onClick={handleToggle}>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`rounded-sm hover:cursor-pointer ${
                          isHover || isFocus || isOpen ? "" : "hidden"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="mt-1 w-6 h-6 text-gray-600 text-xs"
                        >
                          <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                        </svg>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="text-gray-300">
                      <p>More actions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuTrigger>
              <DropdownMenuContent ref={MenuRef} side="right">
                <DropdownMenuItem
                  className="flex items-center"
                  onSelect={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    onEdit({ id, title, description });
                    setIsOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="w-5 h-5"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                  </svg>
                  <span onPointerDown={(e) => e.stopPropagation()}>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onSelect={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setShowDeleteDialog(true);
                    setIsOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" />
                  </svg>
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="px-2 pt-[6px] text-gray-800 text-sm font-light">
          {description}
        </div>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent onPointerDown={(e) => e.stopPropagation()}>
          <DialogClose asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa task này không?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(false);
              }}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
