"use client"
import React from 'react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Card() {
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  
  const handleMouseLeave = () => {
    if(!isFocus) {
      setIsHover(false);
    }
  };

  const handleClick = () => {
    setIsFocus((prevFocus) => {
      const newFocus = !prevFocus;
      setIsHover(newFocus); // Cập nhật isHover theo giá trị mới của isFocus
      return newFocus; // Trả về giá trị mới cho isFocus
    });
  }

  return (
    <div 
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onClick={handleClick}
    className={`mx-4 py-3 bg-white border-[1px] shadow-md border-gray-300 rounded-lg mt-3 hover:cursor-grab ${isFocus ?  'border-blue-400' :''}`}>
      <div className="flex justify-start items-center min-w-[340px] gap-x-2 px-2">
      <div className="flex items-center gap-1 justify-center select-none h-6">
        <div className="rounded-[50%] border-2 border-green-500 bg-green-200 w-4 h-4"></div>
        <div className="text-sm text-gray-600">Project</div>
        <div className="text-sm text-gray-600 mr-1">
          #2
        </div>
        <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <div className={`rounded-sm hover:cursor-pointer ${isHover || isFocus ? '' : 'hidden'}`}>
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
      </div>
      </div>
      <div className="px-2 pt-[6px] text-gray-800 text-sm font-light">Back end</div>
    </div>
  )
}
