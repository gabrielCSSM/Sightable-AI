import { getServerSession } from "next-auth";
import RenderUI from "./renderUI";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user.role != "pending") {

    if (session) {
      const myUser = {
        user: session.user.email.split("@")[0],
        email: session.user.email,
        role: session.user.role,
        files: Number(session.user.files_processed) ?? 0,
        summaries: Number(session.user.summaries_made) ?? 0
      };
      return <RenderUI myUser={myUser} />;
    } else {
      redirect("http://localhost:3000/");
    }
  } else {
    redirect("http://localhost:3000/");
  }
}
