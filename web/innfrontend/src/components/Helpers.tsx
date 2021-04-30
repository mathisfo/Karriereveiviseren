


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
