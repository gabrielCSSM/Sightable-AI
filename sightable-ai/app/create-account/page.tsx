import { redirect } from "next/navigation";
import CreateAccountForm from "./createAccountForm";


async function handleAccountCreation(formData: FormData) {
  "use server";
  
  const email = formData.get("email");
  const pass = formData.get("password");

  if(email == process.env.CREATE_TEST_EMAIL_USER && pass == process.env.CREATE_TEST_EMAIL_PASS) {
    redirect(`/validate-account`);
  } 

}
export default function renderLogin() {
    return <CreateAccountForm action={handleAccountCreation} />
}