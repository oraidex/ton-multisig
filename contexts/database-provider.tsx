"use client";

import database from "@/database/database";
import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { FC, PropsWithChildren } from "react";

const WatermelonProvider: FC<PropsWithChildren> = ({ children }) => {
  return <DatabaseProvider database={database}>{children}</DatabaseProvider>;
};

export default WatermelonProvider;
