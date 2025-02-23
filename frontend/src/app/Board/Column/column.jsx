import React from "react";
import HeadColumn from "./head_column";
import Card from "./Card/card";
import FootColmun from "./foot_column";

export default function Column() {
  return (
    <div className="flex flex-col min-w-xs min-h-[500px] border-[1px] border-gray-300 rounded-lg bg-gray-100">
      <HeadColumn title="Inprogress" className="flex-none"/>
      <div className="flex-1 min-h-[300px]">
        <Card/>
      </div>
      <FootColmun className="mt-2"/>
    </div>
  );
}
