"use client";
import { useEffect } from "react";
import Header from "@/components/header";
import History from "@/components/history";
import Game from "@/components/game";
import Image from "next/image";
import Title from "../../public/title.png";
import Instructions from "@/components/instructions";
import { socket } from "../services/socket";

export default function Home() {
  useEffect(() => {
    alert("test " + socket.connected);
  }, []);
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
