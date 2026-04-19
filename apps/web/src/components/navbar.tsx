"use client";

import { Button } from "@workspace/ui/components/button";
import { useEffect, useState } from "react";
import useSWR from "swr";
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

export function Navbar({
  navbarData: initialNavbarData,
  settingsData: initialSettingsData,
}: {
  navbarData: null;
  settingsData: QueryGlobalSeoSettingsResult;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

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
    <header
      className={`sticky top-0 z-9999999 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex aspect-[2.4] w-[90px] items-center sm:w-[108px]">
            {logo && (
              <Logo
                alt={siteTitle || ""}
                height={45}
                image={logo}
                priority
                width={108}
              />
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-5 lg:gap-7">
            <Button aria-label="Search Menu" size="icon" variant="ghost">
              <svg
                aria-label="Search Menu"
                className="size-6"
                fill="none"
                height="27"
                role="img"
                style={{ mixBlendMode: "exclusion" }}
                viewBox="0 0 25 27"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10.1404"
                  cy="10.1404"
                  r="9.39035"
                  stroke="#9C9C9D"
                  strokeWidth="1.5"
                />
                <line
                  stroke="#9C9C9D"
                  strokeWidth="1.5"
                  x1="16.0391"
                  x2="24.39"
                  y1="17.3644"
                  y2="25.7153"
                />
              </svg>
            </Button>

            <Button aria-label="Mail Icon" size="icon" variant="ghost">
              <svg
                aria-label="Mail Icon"
                className="size-6 sm:size-7"
                fill="none"
                height="23"
                role="img"
                style={{ mixBlendMode: "exclusion" }}
                viewBox="0 0 33 23"
                width="33"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  height="21.1667"
                  stroke="#9C9C9D"
                  strokeWidth="1.5"
                  width="30.7105"
                  x="0.75"
                  y="0.75"
                />
                <path
                  d="M3.57892 4.77197L15.5087 13.7193L28.6315 4.77197"
                  stroke="#9C9C9D"
                  strokeWidth="1.5"
                />
              </svg>
            </Button>

            <Button aria-label="Hamburger Menu" size="icon" variant="ghost">
              <svg
                aria-label="Hamburger Menu"
                className="size-6 sm:size-7"
                fill="none"
                height="23"
                role="img"
                style={{ mixBlendMode: "exclusion" }}
                viewBox="0 0 32 23"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  stroke="#9C9C9D"
                  strokeWidth="1.5"
                  x2="31.0175"
                  y1="0.75"
                  y2="0.75"
                />
                <line
                  stroke="#9C9C9D"
                  strokeWidth="1.5"
                  x1="0"
                  x2="31.0176"
                  y1="11.4868"
                  y2="11.4868"
                />
                <line
                  stroke="#9C9C9D"
                  strokeWidth="1.5"
                  x1="0"
                  x2="31.0176"
                  y1="22.2236"
                  y2="22.2236"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {error && process.env.NODE_ENV === "development" && (
        <div className="border-destructive/20 border-b bg-destructive/10 px-4 py-2 text-destructive text-xs">
          Navigation data fetch error: {error.message}
        </div>
      )}
    </header>
  );
}