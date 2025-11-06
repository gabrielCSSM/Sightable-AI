  "use client";
  import { useState } from "react";
  import CreateAccountButton from "./components/createAccountButton";



  export default function createAccountForm({
    action,
  }: {
    action: (formData: FormData) => void;
  }) {

    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
      
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20">
        <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          Debug!: THIS IS THE ACCOUNT CREATION PAGE
        </p>

        <form
          action={action}
          className="flex flex-col gap-3 max-w-sm mx-auto p-6 border rounded-xl shadow"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">
            Create your account
          </h2>
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <input
            name="password"
            type="password"
            onChange={(p) => setPassword(p.target.value)}
            placeholder="Password"
            className="border p-2 rounded"
            required
          />
          <CreateAccountButton pendingUser={email} password={pass}/>
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
