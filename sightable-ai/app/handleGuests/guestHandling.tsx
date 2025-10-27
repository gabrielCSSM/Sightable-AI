import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";
import GuestButton from "./components/guestButton";

export default async function GuestLoginDialogue() {
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/auth/guest");
  const guest = await res.json();


  return (
    <div>
      <h1> Welcome, you are {guest.email} </h1>
      <p>
        You have been allowed to try Sightable Ai, for free with some
        limitations, as for they go, u have only avaliable the notes and summary
        function, plus a max 3 file restriction
      </p>
      <div>
        <GuestButton myGuest={guest.email}></GuestButton>
        <p>
          Or{" "}
          <a className="underline hover:font-bold" href="/login">
            sign-up
          </a>{" "}
          to experience the full potential
        </p>
      </div>
    </div>
  );
}
