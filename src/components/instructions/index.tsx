"use client";
import Image from "next/image";
import React from "react";
import HelpIcon from "../../../public/help-icon.svg";
import "./index.css";

const Instructions: React.FC = () => {
  return (
    <div className="instructions-button" onClick={() => alert("Info")}>
      <Image alt="help" src={HelpIcon} width={32} height={32} />
      <span>How to play</span>
    </div>
  );
};

export default Instructions;
