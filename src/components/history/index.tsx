"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import Image from "next/image";
import DafaultAvatarImage from "../../../public/avatar.svg";
import { Game, gameService } from "@/services/gameService";
import { EventType, socket } from "@/services/socket";

const Header: React.FC = () => {
  const [gameHistory, setGameHistory] = useState<Game[]>([]);

  useEffect(() => {
    gameService
      .getHistory({
        take: 15,
      })
      .then((res) => {
        if (res) {
          setGameHistory(res);
        }
      });
    socket.on(EventType.UpdateHistory, (data: Game[]) => {
      setTimeout(() => setGameHistory(data), 3000);
    });

    return () => {
      socket.off(EventType.UpdateHistory);
    };
  }, []);

  return (
    <div className="history-container">
      <h4 className="history-title">Recent plays</h4>
      <div className="history-content">
        {gameHistory.map(({ id, bet, isWin, User: { avatar, userName } }) => (
          <div key={id} className="history-item">
            <Image
              alt="avatar"
              src={avatar ?? DafaultAvatarImage}
              width={32}
              height={32}
            />

            <span>
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                {userName}
              </span>{" "}
              Flliped {bet} and{" "}
              {isWin ? (
                <span style={{ color: "rgba(163, 215, 97, 1)" }}>Double</span>
              ) : (
                <span style={{ color: "rgba(228, 125, 102, 1)" }}>
                  Got rugged
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
