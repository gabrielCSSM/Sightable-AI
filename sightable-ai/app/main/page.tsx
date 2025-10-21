import NextAuth, { getServerSession } from "next-auth";
import RenderUI from "./renderUI";


export default async function Page() {
  const session = await getServerSession();
  if(session) {
    return <p>HAY SESION {session.user?.name} </p>
  } else {
    return <p>NO HAY SESION {session}</p>
  }
  //return <RenderUI />
}