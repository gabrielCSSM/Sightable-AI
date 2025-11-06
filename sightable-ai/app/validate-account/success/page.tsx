import { getServerSession } from "next-auth";
import RenderSuccessfulPage from "./redirectionPage";

export default async function Page() {
  return (
    <div>
      <RenderSuccessfulPage />
    </div>
  );
}
