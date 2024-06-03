"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import Image from "next/image";
import { CoinSide, gameService } from "@/services/gameService";
import CoinImage from "../../../public/coin.svg";
import CoinBackImage from "../../../public/CoinBack.svg";
import CoinFrameEllipseImage from "../../../public/frame-ellipse.svg";
import CoinFrameImage from "../../../public/frame.svg";
import { socket } from "@/services/socket";

const Game: React.FC = () => {
  const [bet, setBet] = useState<{
    side?: CoinSide;
    amount?: number;
    isWin?: boolean | null;
  }>({});

  useEffect(() => {
    console.log("bet", bet);
  }, [bet]);

  const setBetAmount = (amount: number) => {
    setBet({
      ...bet,
      amount,
    });
  };

  const flipCoin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!bet.side) {
      return alert("Choose side coin");
    }
    if (!bet.amount) {
      return alert("Choose amount");
    }
    if (bet.amount <= 0) {
      return alert("Bet must be more then 0");
    }
    gameService.play({ bet: bet.amount, side: bet.side }).then((res) => {
      if (!res) {
        return alert("Invalid data");
      }
      setBet({
        ...bet,
        isWin: res.success,
      });
      setTimeout(() => {
        alert(res.success ? "You WIN" : "You LOSE");
        setBet({});
      }, 3000);
    });
  };

  const showSide = () => {
    if (bet.side && bet.isWin !== undefined && bet.isWin !== null) {
      if (bet.isWin) {
        return bet.side.toLowerCase();
      }
      return bet.side === CoinSide.HEADS
        ? CoinSide.TAILS.toLowerCase()
        : CoinSide.HEADS.toLowerCase();
    }
    console.log("clear animate");
    return undefined;
  };

  return (
    <div className="game">
      <div className="coin-image-container">
        <Image
          alt="coin-background-frame"
          src={CoinFrameImage}
          className="game-coin-background-frame"
        />
        <Image
          alt="coin-background-circle"
          src={CoinFrameEllipseImage}
          className="game-coin-background-circle"
        />
        <div className="coin-fliper">
          <div id="coin" className={showSide()}>
            <div className="side-a">
              <Image alt="coin" src={CoinImage} width={240} height={240} />
            </div>
            <div className="side-b">
              <Image alt="coin" src={CoinBackImage} width={240} height={240} />
            </div>
          </div>
        </div>
      </div>

      <div className="game-form">
        <div className="game-form-container">
          <div className="game-form-row">
            <span
              className="game-side"
              id={bet.side === CoinSide.HEADS ? "bet-active" : undefined}
              style={{
                background:
                  "linear-gradient(95.68deg, #EFC250 -14.41%, #FFE4A6 41.42%, #D0961F 72.44%, #5A380F 109.66%)",
              }}
              onClick={() => {
                setBet({
                  ...bet,
                  side: CoinSide.HEADS,
                });
              }}
            >
              HEADS
            </span>
            <span
              className="game-side"
              id={bet.side === CoinSide.TAILS ? "bet-active" : undefined}
              style={{
                background:
                  "linear-gradient(95.68deg, #525252 -14.41%, #FFFFFF 41.42%, #D6D6D6 72.44%, #6C6C6C 109.66%)",
              }}
              onClick={() => {
                setBet({
                  ...bet,
                  side: CoinSide.TAILS,
                });
              }}
            >
              TAILS
            </span>
          </div>
          <h5
            style={{
              textAlign: "center",
            }}
          >
            How much you want to double?
          </h5>
          <div className="game-form-row">
            <span
              className="game-bet-amount"
              id={bet.amount === 5 ? "bet-active" : undefined}
              onClick={() => setBetAmount(5)}
            >
              5
            </span>
            <span
              className="game-bet-amount"
              id={bet.amount === 10 ? "bet-active" : undefined}
              onClick={() => setBetAmount(10)}
            >
              10
            </span>
            <span
              className="game-bet-amount"
              id={bet.amount === 25 ? "bet-active" : undefined}
              onClick={() => setBetAmount(25)}
            >
              25
            </span>
          </div>
          <div className="game-form-row">
            <span
              className="game-bet-amount"
              id={bet.amount === 50 ? "bet-active" : undefined}
              onClick={() => setBetAmount(50)}
            >
              50
            </span>
            <span
              className="game-bet-amount"
              id={bet.amount === 100 ? "bet-active" : undefined}
              onClick={() => setBetAmount(100)}
            >
              100
            </span>
            <span
              className="game-bet-amount"
              id={bet.amount === 200 ? "bet-active" : undefined}
              onClick={() => setBetAmount(200)}
            >
              200
            </span>
          </div>
        </div>
        <button
          onClick={
            bet.isWin === undefined || bet.isWin === null
              ? (e) => flipCoin(e)
              : undefined
          }
          style={
            bet.isWin !== undefined && bet.isWin !== null
              ? {
                  opacity: 0.5,
                }
              : undefined
          }
        >
          <span>DOUBLE OR NOTHING</span>
        </button>
        <button
          onClick={() => {
            const result = socket.connect();
            alert(
              `${result.connected} ${result.active} ${result.disconnected}`
            );
          }}
        >
          <span>CONNECT</span>
        </button>
      </div>
    </div>
  );
};

export default Game;
