"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

const useGoBackBrowser = () => {
  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      prompt("abc");
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]); // this fixed the issue
};

export default useGoBackBrowser;
