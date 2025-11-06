`use client`;
import { handleAccountCreation } from "./handle";
import CreateAccountForm from "./createAccountForm";
import { signIn } from "next-auth/react";



export default function renderLogin() {
  return <CreateAccountForm action={handleAccountCreation} />;
}
