"use client";
import { useState, useEffect, useCallback } from "react";
import { useTelegram } from "./telegram.provider";

export default function Home() {
  const [counter, setCounter] = useState<number>(0);
  const [gameResult, setGameResult] = useState<boolean | null>(null);
  const telegram = useTelegram();

  const handleMainButtonClick = useCallback(() => {
    telegram.showAlert(`You clicked ${counter} times!`);
  }, [counter, telegram]);

  useEffect(() => {
    telegram.MainButton.setParams({
      text: "CLICK ON ME",
      is_active: true,
      is_visible: true,
    });
  }, [telegram]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", handleMainButtonClick);
    return () => telegram.offEvent("mainButtonClicked", handleMainButtonClick);
  }, [handleMainButtonClick, telegram]);

  return (
    <>
      <h2>Hello, {telegram.initDataUnsafe?.user?.first_name || "user"}</h2>
      <p>Let&apos;s create a Telegram Web App!</p>
      <div>
        <div>
          <span>Counter</span>
          {counter}
        </div>
        <div
          style={{
            width: 240,
          }}
        >
          - {JSON.stringify(telegram)}-{" "}
          {JSON.stringify(telegram.initDataUnsafe)}
        </div>
        <button onClick={() => setCounter(counter + 1)}>+</button>
        <button onClick={() => {}}>TEST</button>
      </div>
    </>
  );
}
