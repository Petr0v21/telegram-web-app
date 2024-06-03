"use client";
import Header from "@/components/header";
import History from "@/components/history";
import Game from "@/components/game";
import Image from "next/image";
import Title from "../../public/title.png";
import Instructions from "@/components/instructions";

export default function Home() {
  return (
    <>
      <Header />
      <div className="main-container">
        <Image
          alt="title"
          src={Title}
          style={{
            minWidth: 320,
            maxWidth: 480,
            width: "80vw",
            height: "auto",
          }}
        />
        <Instructions />
        <Game />
        <History />
      </div>
    </>
  );
}
