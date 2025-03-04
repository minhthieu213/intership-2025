"use client";
import React, { useState, useRef, useEffect } from 'react';
import InputAddCard from '@/app/Board/Column/input_add_card';
import Column from '@/app/Board/Column/column';
import taskdost from '@/app/MockData/taskdost';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Board() {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [columns, setTasks] = useState(taskdost);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentStatus, setCurrentStatus] = useState(''); // Trạng thái hiện tại
  const inputRef = useRef(null);

  const handleShowInput = (status) => {
    setCurrentStatus(status); // Lưu trạng thái hiện tại
    setShowInput(true);
    setDialogOpen(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const handleOnChangeTitle = (e) => {
    setInputValue(e.target.value);
    setTitle(e.target.value);
  };

  const handleOnChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = () => {
    if (title.trim() === '' || description.trim() === '') return;

    const newTask = {
      id: Math.max(...columns.flatMap(t => t.task.map(task => task.id))) + 1, // Tạo ID mới
      title: title,
      description: description,
    };

    const updatedTasks = columns.map((t) =>
      t.status === currentStatus
        ? { ...t, task: [...t.task, newTask] }
        : t
    );

    setTasks(updatedTasks);
    setTitle('');
    setDescription('');
    setDialogOpen(false); 
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowInput(false);
      setInputValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyPress = (e, status) => {
    if (e.key === 'Enter') {
      handleAddTask(status);
    }
  };

  return (
    <div className="flex gap-4 p-4 relative">
      {columns.map((column) => (
        <Column
          key={column.id_status}
          title={column.status}
          description={column.description}
          numberTask={column.numberTask}
          tasks={column.task}
          onAddItemClick={() => handleShowInput(column.status)}
          onAddTask={() => handleAddTask(column.status)}
          onKeyPress={(e) => handleKeyPress(e, column.status)}
        />
      ))}


      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" style={{ display: 'none' }}>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create new issue</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={title} onChange={handleOnChangeTitle} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" value={description} onChange={handleOnChangeDescription} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddTask}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}