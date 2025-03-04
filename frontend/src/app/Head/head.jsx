import React from 'react'
import InputDemo from "@/app/Head/filter";
import ButtonDemo from "@/app/Head/button";

export default function Head() {
  return (
    <div className="flex px-4 w-full pt-5">
        <InputDemo className="flex-grow"/>
        <div className="flex gap-x-2 ml-2">
        <ButtonDemo title ="Discard" className="flex-2/10 bg-gray-300 hover:cursor-not-allowed hover:bg-gray-300"/>
        <ButtonDemo title ="Save" className="flex-2/10 bg-green-300 hover:cursor-not-allowed hover:bg-green-300"/>
        </div>
    </div>
  )
}
