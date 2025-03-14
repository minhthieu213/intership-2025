import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function HeadColumn({ title, description, numberTask, className }) {

  const statusClasses = {
    'To Do': 'border-green-500 bg-green-200',
    'In Progress': 'border-yellow-500 bg-yellow-200',
    'Done': 'border-purple-500 bg-purple-200',
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center min-w-[350px] px-4 pt-2">
        <div className="flex items-center justify-center gap-x-2 select-none">
          <div className={`rounded-[50%] border-2 ${statusClasses[title]} w-4 h-4`}></div>
          <div className="font-semibold text-base">{title}</div>
          <div className="rounded-[50%] bg-gray-200 w-[18px] h-[18px] relative">
            <div className="absolute left-[6px] bottom-[0.5px] text-gray-600 font-medium text-sm">
              {numberTask}
            </div>
          </div>
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <div className="hover:bg-gray-100 rounded-sm hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-gray-600 text-xs">
                  <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                </svg>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-gray-300">
              <p>Actions for column: {title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="px-4 pt-2 text-gray-500 text-sm font-light">{description}</div>
    </div>
  )
}