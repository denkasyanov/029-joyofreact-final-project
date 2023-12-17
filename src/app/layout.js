import RespectMotionPreferences from "@/components/RespectMotionPreferences";
import clsx from "clsx";
import { Spline_Sans_Mono, Work_Sans } from "next/font/google";

import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./styles.css";

import { cookies } from "next/headers";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  const colorThemeCookie = cookies().get("color-theme");
  const theme = colorThemeCookie?.value || "light";

  const themeColors = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={themeColors}
    >
      <body>
        <RespectMotionPreferences>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </RespectMotionPreferences>
      </body>
    </html>
  );
}

export default RootLayout;
