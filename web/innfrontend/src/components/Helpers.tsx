


import React from "react";

export function convertTime(time: string) {
    const monthNames = [
        "januar",
        "februar",
        "mars",
        "april",
        "mai",
        "juni",
        "juli",
        "august",
        "september",
        "oktober",
        "november",
        "desember",
      ];

    return (
      time.slice(8, 10) +
      "." +
      " " +
      monthNames[Number(time.slice(5, 7))] +
      " " +
      time.slice(0, 4)
    );
  }

export function setColor(modul?: number) {
    switch (modul) {
      case 1:
        return "#ffc971";
      case 2:
        return "#cfe1b9";
      case 3:
        return "#e28080";
      default:
        return "#adb5bd";
    }
  }
