"use client"
import React from 'react'
import HeadColumn from './head_column'
import Card from './Card/card'
import FootColumn from './foot_column'

export default function Column({ title, description, tasks, numberTask, onAddItemClick, onAddTask }) {
  return (
    <div className="flex flex-col min-w-xs min-h-[500px] border-[1px] border-gray-300 rounded-lg bg-gray-100">
      <HeadColumn title={title} description={description} numberTask={numberTask} className="flex-none" />
      <div className="flex-1 min-h-[300px]">
        {tasks.map((task) => (
          <Card key={task.id} status={title} id={task.id} title={task.title} description={task.description}/>
        ))}
      </div>
      <FootColumn className="mt-2" onClick={onAddItemClick} />
    </div>
  )
}