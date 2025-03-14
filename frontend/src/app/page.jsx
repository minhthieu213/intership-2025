"use client";
import React from "react";
import Board from "./Board/board";
import Head from "./Head/head"
import { usePathname } from "next/navigation";

export default function Page() {

  return (
    <div>
      <Head/>
      <Board/>
    </div>
  )
}
