`use client`;

export default function loginForm({
  action,
}: {
  action: (formData: FormData) => void;
}) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20">
      <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        Debug!: THIS IS THE LOGIN PAGE
      </p>

      <form
        action={action}
        className="flex flex-col gap-3 max-w-sm mx-auto p-6 border rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
        >
          Login
        </button>
      </form>
      <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        Don't have a account?{" "}
        <a className="underline hover:font-bold" href="/create-account">
          Create one here.
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
