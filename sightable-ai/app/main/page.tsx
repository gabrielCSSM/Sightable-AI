import NextAuth, { getServerSession } from "next-auth";
import RenderUI from "./renderUI";

export default async function Page() {
  const session = await getServerSession();
  console.log(session);

  if (session) {
    return (
      <div>
        <p>HAY SESION {session.user?.email} Y ES {""} </p>
        <button>
          <a href="/api/auth/signout">Log Out</a>
        </button>
      </div>
    );
  } else {
    return <p>NO HAY SESION {session}</p>;
  }
  //  return <RenderUI />
}
