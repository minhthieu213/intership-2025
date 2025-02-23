import React from 'react'

export default function FootColumn({className}) {
  return (
    <div className={`${className} px-4 py-2 flex items-center gap-2 text-gray-700 font-semibold text-base rounded-lg hover:bg-gray-200 hover:cursor-pointer`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
        <div>Add item</div>
    </div>
  )
}
