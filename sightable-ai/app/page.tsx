import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LandingPage from "./landing/LandingPage";
import React from "react";

export default async function main() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("http://localhost:3000/main");
  }
  return <LandingPage />;
}
