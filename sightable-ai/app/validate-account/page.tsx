import { redirect } from "next/navigation";
import CreateAccountForm from "./validateAccountForm";

async function handleAccountValidation(formData: FormData) {
  "use server";
  const authCode = formData.get("authCode")
    ? String(formData.get("authCode"))
    : "Empty";

  if (validateCode(authCode)) {
    if (authCode ==  process.env.VALIDATION_TEST_CODE) {
      redirect(`validate-account/success`);
    }
  }
}

function validateCode(code: String) {
  const validationStructure = new RegExp("([0-9]{8})");
  console.log(validationStructure.test(code.trim()))
  return validationStructure.test(code.trim());
}

export default function renderLogin() {
  return <CreateAccountForm action={handleAccountValidation} />;
}
