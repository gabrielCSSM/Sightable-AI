import * as dbTools from "../lib/databaseTools";
import { randomInt } from "crypto";

function generateRandomGuestID() {
  let idGuest = "";
  for (let index = 0; index < 8; index++) {
    const number = randomInt(10);
    idGuest = idGuest.concat(number.toString());
  }
  return idGuest;
}

export default async function validGuestName() {
  let template = "guest" + generateRandomGuestID() + "@sightable.ai";
  let valid = false;

  while (!valid) {
    if ((await dbTools.checkGuestUser(template)) != 1) {
      valid = true;
    } else {
      template = "guest" + generateRandomGuestID() + "@sightable.ai";
    }
  }
  
  return template;
}

