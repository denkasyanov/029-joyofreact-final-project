"use client";
import clsx from "clsx";
import { Moon, Rss, Sun } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

import Link from "next/link";

import React from "react";
import styles from "./Header.module.css";

import Cookies from "js-cookie";

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleColorThemeToggle() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    Cookies.set("color-theme", nextTheme, { expires: 1000 });

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    root.setAttribute("data-color-theme", nextTheme);

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <Link
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </Link>
        <button className={styles.action} onClick={handleColorThemeToggle}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
