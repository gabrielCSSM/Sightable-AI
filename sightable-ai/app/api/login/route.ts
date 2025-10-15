import { cookies } from "next/headers";

function validate(email: string, pass: string) {
  if (
    email == process.env.LOGIN_TEST_EMAIL_USER &&
    pass == process.env.LOGIN_TEST_EMAIL_PASS
  ) {
    return true;
  }
  return false;
}

export async function POST(rq: Request) {
  const { email, password } = await rq.json();
  if (validate(email, password)) {
    const token = "sessionTokenLogin";
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }
  return Response.json({ success: true });
}

export async function GET() {
  return Response.json({ success: true });
}
