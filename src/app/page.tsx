"use client";
import { useState } from "react";
import { useTelegram } from "./telegram.provider";
import { TelegramWebApps } from "telegram-webapps-types";
import Image from "next/image";
import CoinImage from "../../public/coin.svg";
import { gameService } from "../services/gameService";

export default function Home() {
  const [gameResult, setGameResult] = useState<boolean | null>(null);
  const [bet, setBet] = useState<number>(1);
  const telegram = useTelegram() as TelegramWebApps.WebApp;

  return (
    <>
      <h2>Hello, {telegram.initDataUnsafe?.user?.first_name || "user"}</h2>
      <p>Coin Flip Telegram Web App!</p>
      <div>
        <div>
          <Image alt="Coin" src={CoinImage} />
        </div>
        <div>
          <input
            type="number"
            name="bet"
            value={bet}
            onChange={({ target: { value } }) => {
              const val = Number(value);
              if (!value || isNaN(val) || val <= 0) {
                setBet(1);
              }
              setBet(val);
            }}
          />
        </div>
        <button
          onClick={() => {
            gameService.play({ bet }).then((res) => {
              if (res && res.success) {
                // (telegram as any).showAlert(`You win!`);
                alert(`You win!`);
              }
              // (telegram as any).showAlert(`You lose! ${res}`);
              alert(`You lose! ${res}`);
              setBet(1);
            });
          }}
        >
          Flip
        </button>
      </div>
    </>
  );
}

// const handleMainButtonClick = useCallback(() => {
//   (telegram as any).showAlert(`You clicked ${counter} times!`);
// }, [counter, telegram]);

// useEffect(() => {
//   telegram.MainButton.setParams({
//     text: "CLICK ON ME",
//     is_active: true,
//     is_visible: true,
//   });
// }, [telegram]);

// useEffect(() => {
// telegram.onEvent("mainButtonClicked", handleMainButtonClick);
// return () => telegram.offEvent("mainButtonClicked", handleMainButtonClick);
// }, [handleMainButtonClick, telegram]);
