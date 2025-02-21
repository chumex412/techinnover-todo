import localFont from "next/font/local"

export const sfProText = localFont({
  src: [
    {
      path: "./SF-Pro-Text-Medium.otf",
      weight: '500',
      style: "normal"
    },
    {
      path: "./SF-Pro-Text-Semibold.otf",
      weight: '600',
      style: "normal"
    },
    {
      path: "./SF-Pro-Text-Bold.otf",
      weight: '700',
      style: "normal"
    }
  ],
  variable: "--sf-pro-text"
})