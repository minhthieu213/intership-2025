import Head from "@/app/Head/head";
import Board from "@/app/Board/board";

export default function Home() {
  return (
    <div className="flex flex-col">
        <Head/>
        <Board/>
    </div>
  );
}
