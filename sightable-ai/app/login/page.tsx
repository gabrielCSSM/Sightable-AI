import { redirect } from "next/navigation";
import LoginForm from "./loginForm";
import { cookies } from "next/headers";

async function handleLogin(formData: FormData) {
  "use server";
  const email = formData.get("email");
  const pass = formData.get("password");

  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, pass }),
    headers: { "Content-Type": "application/json" },
  });
  
  redirect(`/main`);
}

export default function renderLogin() {
  return <LoginForm action={handleLogin} />;
}
