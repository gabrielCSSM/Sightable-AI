"use client";
import { FormEvent, useState } from "react";
import CreateAccountButton from "./components/createAccountButton";

export default function createAccountForm() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      error.length != 0 &&
      error_pass.length != 0 &&
      error_email.length != 0
    ) {
      console.log("FIX YOUR ERRORS!");
    } else {
      const fd = new FormData(e.currentTarget);

      const email = fd.get("email");
      const password = fd.get("password");

      const res = await fetch("/api/auth/users/pending/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log("algo mal");
        setError("Usuario ya existe!");
      } else {
        setError("");
      }
    }

    //<CreateAccountButton pendingUser={email} password={pass}/>
  }
  const emailRegEx = new RegExp("^([a-z]+@[a-z]+.[a-z]{1,3})$");
  const passRegEx = new RegExp("^(.{8,30})$");

  const [email, setEmail] = useState("");
  const [error_email, setErrorEmail] = useState("");

  const [pass, setPassword] = useState("");
  const [error_pass, setPassError] = useState("");

  const [error, setError] = useState("");

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20">
      <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        Debug!: THIS IS THE ACCOUNT CREATION PAGE
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-sm mx-auto p-6 border rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">
          Create your account
        </h2>
        <input
          name="email"
          type="email"
          onChange={(e) => {
            setPassword(e.target.value);
            if (!e.target.value.match(emailRegEx)) {
              setErrorEmail("Introduce un correo valido!");
            } else {
              setErrorEmail("");
            }
          }}
          onFocus={(p) => {
            if (!p.target.value.match(passRegEx)) {
              setErrorEmail("Introduce un correo valido!");
            } else {
              setErrorEmail("");
            }
          }}
          onBlur={(e) => {
            if (e.target.value == "") {
              setErrorEmail("");
            }
          }}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <span className="text-red-600">{error_email}</span>
        <input
          name="password"
          type="password"
          onChange={(p) => {
            setPassword(p.target.value);
            if (!p.target.value.match(passRegEx)) {
              setPassError("Introduce una contraseña valida!");
            } else {
              setPassError("");
            }
          }}
          onFocus={(p) => {
            if (!p.target.value.match(passRegEx)) {
              setPassError("Introduce una contraseña valida!");
            } else {
              setPassError("");
            }
          }}
          onBlur={(p) => {
            if (p.target.value == "") {
              setPassError("");
            }
          }}
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        <span className="text-red-600">{error_pass}</span>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
        >
          {" "}
          Create{" "}
        </button>
        <span className="text-red-600">{error}</span>
      </form>
      <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        Already have an account?{" "}
        <a className="underline hover:font-bold" href="/login">
          Login here.
        </a>
      </p>

      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white rounded p-2"
      >
        <a href="/">Return</a>
      </button>
    </div>
  );
}
