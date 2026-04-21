"use client";

import { Button } from "@workspace/ui/components/button";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { motion, Variants } from "framer-motion";
import { Logo } from "@/components/logo";
import { QueryGlobalSeoSettingsResult } from "@workspace/sanity/types";

type NavigationData = {
  navbarData: null;
  settingsData: QueryGlobalSeoSettingsResult;
};

const fetcher = async (url: string): Promise<NavigationData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch navigation data");
  }
  return response.json();
};

function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex aspect-[2.4] w-[90px] items-center sm:w-[108px]">
            <div className="h-full w-full animate-pulse bg-muted/50" />
          </div>

          <div className="flex items-center gap-2 sm:gap-5 lg:gap-7">
            <div className="size-10 animate-pulse bg-muted/50" />
            <div className="size-10 animate-pulse bg-muted/50" />
            <div className="size-10 animate-pulse bg-muted/50" />
          </div>
        </div>
      </div>
    </header>
  );
}

const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const container: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easing,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};

export function Navbar({
  navbarData: initialNavbarData,
  settingsData: initialSettingsData,
}: {
  navbarData: null;
  settingsData: QueryGlobalSeoSettingsResult;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data, error, isLoading } = useSWR<NavigationData>(
    "/api/navigation",
    fetcher,
    {
      fallbackData: {
        navbarData: initialNavbarData,
        settingsData: initialSettingsData,
      },
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: true,
      refreshInterval: 30_000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    },
  );

  const navigationData = data || {
    navbarData: initialNavbarData,
    settingsData: initialSettingsData,
  };

  const { settingsData } = navigationData;
  const { logo, siteTitle } = settingsData || {};

  if (isLoading && !data && !initialSettingsData) {
    return <NavbarSkeleton />;
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easing }}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-[#F3F0ED]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-6"
      >
        <div className="flex items-center justify-between">
          <motion.div
            variants={item}
            className="flex aspect-[2.4] w-[90px] items-center sm:w-[108px]"
          >
            {logo && (
              <Logo
                alt={siteTitle || ""}
                height={45}
                image={logo}
                priority
                width={108}
              />
            )}
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-5 lg:gap-7">
            {[
              {
                key: "search",
                icon: (
                  <svg className="size-6" viewBox="0 0 25 27" fill="none">
                    <circle cx="10.14" cy="10.14" r="9.39" stroke="#9C9C9D" />
                    <line
                      x1="16.03"
                      y1="17.36"
                      x2="24.39"
                      y2="25.71"
                      stroke="#9C9C9D"
                    />
                  </svg>
                ),
              },
              {
                key: "mail",
                icon: (
                  <svg
                    className="size-6 sm:size-7"
                    viewBox="0 0 33 23"
                    fill="none"
                  >
                    <rect
                      x="0.75"
                      y="0.75"
                      width="30.71"
                      height="21.16"
                      stroke="#9C9C9D"
                    />
                    <path
                      d="M3.57 4.77L15.5 13.7L28.63 4.77"
                      stroke="#9C9C9D"
                    />
                  </svg>
                ),
              },
              {
                key: "menu",
                icon: (
                  <svg
                    className="size-6 sm:size-7"
                    viewBox="0 0 32 23"
                    fill="none"
                  >
                    <line y1="0.75" x2="31" y2="0.75" stroke="#9C9C9D" />
                    <line y1="11.48" x2="31" y2="11.48" stroke="#9C9C9D" />
                    <line y1="22.22" x2="31" y2="22.22" stroke="#9C9C9D" />
                  </svg>
                ),
              },
            ].map((itemData) => (
              <motion.div
                key={itemData.key}
                variants={item}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="icon" variant="ghost">
                  {itemData.icon}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {error && process.env.NODE_ENV === "development" && (
        <div className="border-destructive/20 border-b bg-destructive/10 px-4 py-2 text-xs text-destructive">
          Navigation data fetch error: {error.message}
        </div>
      )}
    </motion.header>
  );
}
