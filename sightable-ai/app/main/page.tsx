import { getServerSession } from "next-auth";
import RenderUI from "./renderUI";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  let available = false;

  if (session?.user.role != "pending") {
    if (session?.user.role != "guest") {
      available = true;
    }

    if (session) {
      const myUser = {
        user: session.user.email.split("@")[0],
        email: session.user.email,
        role: session.user.role,
        tries: (session.user.role == "guest")? 3 : -1,
        files: 0,
        summaries: 0,
      };
      //console.log(myUser);
      return <RenderUI available={available} myUser={myUser} />;
    } else {
      redirect("http://localhost:3000/");
    }
  } else {
    //console.log(session)
  }
}
