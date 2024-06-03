"use client";
import { User, userService } from "@/services/userService";
import React, { use, useEffect, useState } from "react";
import "./index.css";
import Image from "next/image";
import DafaultAvatarImage from "../../../public/avatar.svg";
import { EventType, socket } from "@/services/socket";
import CoinImage from "../../../public/coin.svg";

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    userService.getMe().then((res) => {
      if (res) {
        setUser(res);
        setIsAuth(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isAuth && user?.id) {
      socket.on(
        EventType.UpdateUserBalance + user.id,
        (data: { id: string; balance: number }) => {
          setTimeout(
            () =>
              setUser({
                ...user,
                balance: data.balance,
              }),
            3000
          );
        }
      );
      return () => {
        socket.off(EventType.UpdateHistory);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-balance">
          <span className="header-balance-amount">{user?.balance ?? 0}</span>
          <Image
            alt="avatar"
            src={CoinImage}
            width={25}
            height={25}
            className="header-balance-img"
          />
        </div>
        <Image
          alt="avatar"
          src={user?.avatar ?? DafaultAvatarImage}
          width={45}
          height={45}
          className="header-avatar"
        />
        <span className="header-username">{user?.userName ?? "Unknown"}</span>
      </div>
    </header>
  );
};

export default Header;
