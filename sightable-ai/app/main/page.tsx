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
      return (
        <div>
          <div>
            <p>
              HAY SESION {session.user.email} Y ES {session.user.role}
            </p>
            <button>
              <a href="/api/auth/signout">Log Out</a>
            </button>
          </div>
          <RenderUI available={available}></RenderUI>
        </div>
      );
    } else {
      redirect("http://localhost:3000/");
    }
  } else {
    //console.log(session)
  }
}
