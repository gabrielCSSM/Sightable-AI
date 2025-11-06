"use client";

import DebugText from "@/app/debugText";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

let seconds = 3;
let dots = ".".repeat(seconds);

function startRedirection() {
  const [timeRemaining, secondPassed] = useState(3);

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleRedirection();
    }

    const timer = setTimeout(() => {
      secondPassed((s) => s - 1);
      updateUI(seconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const handleRedirection = () => {
    redirect("/main");
  };

  const updateUI = (secondsRemaining: number) => {
    if (secondsRemaining >= 0) {
      seconds = secondsRemaining;
      dots = ".".repeat(secondsRemaining);
    }
  };
}

export default function RenderSuccessfulPage() {
  startRedirection();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <DebugText PageTitle={"SUCCESFUL LOGIN"} />
      <p>
        Congratulations, you're successfully verified! Redirecting you in{" "}
        {seconds} seconds{dots}{" "}
      </p>
    </div>
  );
}
