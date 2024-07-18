"use client";

import { OraiDEXLogo } from "@/assets/icons/OraiDEXLogo";
import styles from "./index.module.scss";
import ConnectButton from "../connectButton";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href={"/"}>
        <OraiDEXLogo />
      </Link>
      <ConnectButton />
    </div>
  );
};

export default Header;
