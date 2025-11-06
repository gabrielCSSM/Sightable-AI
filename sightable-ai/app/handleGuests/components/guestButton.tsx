"use client";
import { signIn } from "next-auth/react";

export default function GuestButton({ myGuest }: { myGuest: string }) {
  const handleGuest = async () => {
    await signIn("credentials", { type: "guest", email: myGuest });
  };

  return (
    <p>
      Would you like to proceed as a{" "}
      <a onClick={handleGuest} className="underline hover:font-bold">
        guest
      </a>
      ?
    </p>
  );
}
