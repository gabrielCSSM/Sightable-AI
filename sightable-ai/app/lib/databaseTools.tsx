import { randomInt } from "crypto";
import ConnectionDB from "./connectorDB";

function generateValidationCode() {
  let code = "";
  while (code.length <= 7) {
    code += randomInt(10)
  }
  return code;
}

// METHODS FOR THE LOGGED USERS

// Get all of the users who have logged in
export async function getAllLoggedUsers() {
  const { rows } = await ConnectionDB.query("SELECT * FROM loggedUsers;");
  ConnectionDB.end;
  return rows;
}

// Get all data of the user, via email and password
export async function getFullLoggedUser(email: String, pass: String) {
  const query = await ConnectionDB.query(
    "SELECT email FROM loggedUsers WHERE email ='" +
      email +
      "' AND password = crypt('" +
      pass +
      "', password);"
  );
  return query.rows[0];
}

export async function changePassword(email: String, pass: String) {
  const query = await ConnectionDB.query(
    "UPDATE loggedusers SET password=crypt('" +
      pass +
      "', gen_salt('sha256crypt')) WHERE email='" +
      email +
      "';"
  );

  return query.rowCount;
}

// Check if a user exits, via email
export async function checkLoggedUser(email: String) {
  const query = await ConnectionDB.query(
    "SELECT email FROM loggedUsers WHERE email ='" + email + "';"
  );
  return query.rowCount;
}

export async function getPassword(email: String) {
  const query = await ConnectionDB.query(
    "SELECT password FROM loggedUsers WHERE email ='" + email + "'"
  );
  ConnectionDB.end;
  return query.rows[0];
}

export async function checkPassword(email: String, pass: String) {
  const query = await ConnectionDB.query(
    "SELECT password FROM loggedUsers WHERE email='" +
      email +
      "' AND password=crypt('" +
      pass +
      "', password);"
  );
  return query.rowCount;
}

export async function createUser(email: String, password: String) {
  const query = await ConnectionDB.query(
    "INSERT INTO loggedUsers (email, password) VALUES ('" +
      email +
      "',  crypt('" +
      password +
      "', gen_salt('sha256crypt')));"
  );
  ConnectionDB.end;
  return query.rows[0];
}

export async function getAllGuestUsers() {
  const { rows } = await ConnectionDB.query("SELECT * FROM guestUsers;");
  return rows;
}

export async function getGuestUser(email: String) {
  const query = await ConnectionDB.query(
    "SELECT * FROM guestUsers WHERE email ='" + email + "';"
  );
  return query.rows[0];
}

export async function checkGuestUser(email: String) {
  const query = await ConnectionDB.query(
    "SELECT email FROM guestUsers WHERE email ='" + email + "';"
  );
  return query.rowCount;
}

export async function getGuestCharacteristic(email: String) {
  const query = await ConnectionDB.query(
    "SELECT characteristic FROM guestUsers WHERE email ='" + email + "';"
  );
  return query.rows;
}
export async function getGuestRemainingUses(email: String) {
  const query = await ConnectionDB.query(
    "SELECT remaining_uses FROM guestUsers WHERE email ='" + email + "';"
  );
  return query.rows;
}

export async function createGuest(email: String) {
  const char = "TEST";
  const query = await ConnectionDB.query(
    "INSERT INTO guestusers (email, characteristic, remaining_uses) VALUES ('" +
      email +
      "', '" +
      char +
      "', 3);"
  );
  ConnectionDB.end;
  return query.rows;
}

export async function createPendingUser(email: String, pass: String) {
  
  const valCode = generateValidationCode();
  
  
  if (await checkPendingUser(email)) {
    deletePendingUser(email);
    const query = await ConnectionDB.query(
      "INSERT INTO pendingUsers (email, password, validation_code, validated) VALUES ('" +
        email +
        "', '" +
        pass +
        "', '" +
        valCode +
        "', false);"
    );
    ConnectionDB.end;
    return query.rows;
  } else {
    const query = await ConnectionDB.query(
      "INSERT INTO pendingUsers (email, password, validation_code, validated) VALUES ('" +
        email +
        "', '" +
        pass +
        "', '" +
        valCode +
        "', false);"
    );
    ConnectionDB.end;
    return query.rows;
  }
}

export async function getPendingUser(email: String) {
  const query = await ConnectionDB.query(
    "SELECT * FROM pendingUsers WHERE email ='" + email + "';"
  );
  ConnectionDB.end;
  return query.rows[0];
}

export async function checkPendingUser(email: String) {
  const query = await ConnectionDB.query(
    "SELECT * FROM pendingUsers WHERE email ='" + email + "';"
  );
  ConnectionDB.end;
  return query.rowCount;
}

export async function checkValidationCode(
  email: String,
  validationCode: String
) {
  const query = await ConnectionDB.query(
    "SELECT * FROM pendingUsers WHERE email='" +
      email +
      "' AND validation_code='" +
      validationCode +
      "';"
  );
  ConnectionDB.end;
  return query.rowCount;
}

export async function getValidationCode(email: String) {
  const query = await ConnectionDB.query(
    "SELECT validation_code FROM pendingUsers WHERE email ='" + email + "';"
  );
  ConnectionDB.end;
  return query.rows[0];
}

export async function getValidationStatus(email: String) {
  const query = await ConnectionDB.query(
    "SELECT validated FROM pendingUsers WHERE email ='" + email + "';"
  );
  ConnectionDB.end;
  return query.rows[0];
}

export async function updateStatus(email: String) {
  const query = await ConnectionDB.query(
    "UPDATE pendingusers SET validated=true WHERE email='" + email + "';"
  );
  ConnectionDB.end;
  return query.rows[0];
}

export async function updateValidationCode(email: String) {
  generateValidationCode()
  const query = await ConnectionDB.query(
    "UPDATE pendingusers SET validation_code='12345678' WHERE email='" + email + "';"
  );
  ConnectionDB.end;
  return query.rowCount;
}

export async function deletePendingUser(email: String) {
  const query = await ConnectionDB.query(
    "DELETE FROM pendingusers WHERE email='" + email + "';"
  );
  ConnectionDB.end;
}

export async function upgradeUser(email: String) {
  const checkQuery = await getValidationStatus(email);

  if (checkQuery["validated"]) {
    const user = await getPendingUser(email);
    createUser(user["email"], user["password"]);
    deletePendingUser(email);
  }

  ConnectionDB.end;
}
