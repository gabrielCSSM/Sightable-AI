import * as dbTools from "@/app/lib/databaseTools";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const emailRegEx = new RegExp("^([a-z]+@[a-z]+.[a-z]{1,3})$");
const passRegEx = new RegExp("^(.{8,30})$");

export async function GET() {}

export async function POST(req: Request) {
  const data = await req.json();
  const email = data["email"];
  const oldEmail = data["oldEmail"];
  const oldPass = data["currentPassword"];
  const newPass = data["newPassword"];
  const newPass2 = data["confirmPassword"];

  console.log(data);

  if (
    String(oldEmail).match(emailRegEx) &&
    String(oldPass).match(passRegEx) &&
    (await dbTools.checkLoggedUser(email)) == 0
  ) {
    console.log("Datos validados");
    if (String(newPass).match(passRegEx) && String(newPass2).match(passRegEx)) {
      console.log("Contraseñas validadas validados");
      if (newPass != oldPass && newPass2 != oldPass) {
        console.log("Contraseñas diferentes validadas");
        if (newPass == newPass2) {
          if (await dbTools.updateUser(oldEmail, email, oldPass, newPass)) {
            return NextResponse.json(
              { success: true, error: "Redireccionando" },
              { status: 303 }
            );
          }
        } else {
          return NextResponse.json(
            { success: false, error: "No coinciden" },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { success: false, error: "Contraseña nueva igual a la anterior" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, error: "No coinciden" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, error: "No coinciden" },
      { status: 400 }
    );
  }
}
