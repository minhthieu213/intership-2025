"use client"
import React, { useState, useEffect, useRef} from 'react'
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Card({ id, title, description, status }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const MenuRef = useRef(null);

  const statusClasses = {
    'Todo': 'border-green-500 bg-green-200',
    'In Progress': 'border-yellow-500 bg-yellow-200',
    'Done': 'border-purple-500 bg-purple-200',
  };

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    if (!isFocus) {
      setIsHover(false)
    }
  }

  const handleClick = () => {
    setIsFocus((prevFocus) => !prevFocus)
  }

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen)
  }

  const handleClickOutside = (e) => {
    if(MenuRef.current && !MenuRef.current.contains(e.target)){
      setIsOpen(false)
    }
  }

  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`mx-4 py-3 bg-white border-[1px] shadow-md border-gray-300 rounded-lg mt-3 hover:cursor-grab ${isFocus ? 'border-blue-400' : ''}`}
    >
      <div className="flex justify-start items-center min-w-[340px] gap-x-2 px-2">
        <div className="flex items-center gap-1 justify-center select-none h-6">
          <div className={`rounded-[50%] border-2 ${statusClasses[status]} w-4 h-4`}></div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="text-sm text-gray-600 mr-1">#{id}</div>
          <DropdownMenu open={isOpen} onToggle={handleToggle}>
            <DropdownMenuTrigger>
              <div onClick={handleToggle}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
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
            </DropdownMenuTrigger>
            <DropdownMenuContent ref={MenuRef} side="right" onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuItem className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5">
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>

                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
      <div className="px-2 pt-[6px] text-gray-800 text-sm font-light">{description}</div>
    </div>
  )
}