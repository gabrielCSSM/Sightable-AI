import ValidateAccountForm from "./validateAccountForm";
import { handleAccountValidation } from "./handle";

export default async function renderValidation() {
  return (<ValidateAccountForm action={handleAccountValidation} />);
}
