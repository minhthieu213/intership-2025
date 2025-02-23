import React from "react";
import Column from "@/app/Board/Column/column";
import FootColumn from "./Column/foot_column";

export default function Board() {
  return (
    <div className="">
        <div className="grid-cols-3 flex px-4 pt-5 gap-x-2">
          <Column />
          <Column />
          <Column />
        </div>
    </div>
  );
}
