import { randomInt } from "crypto";
import ConnectionDB from "./connectorDB";

function generateValidationCode() {
  let code = "";
  while (code.length <= 7) {
    code += randomInt(10);
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
    "SELECT * FROM loggedUsers WHERE email ='" +
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

export async function getUserID(email: String) {
  const query = await ConnectionDB.query(
    "SELECT id FROM loggedUsers WHERE email ='" + email + "';"
  );
  return query.rows;
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
    "INSERT INTO loggedUsers (email, password, files_processed, summaries_made) VALUES ('" +
      email +
      "',  crypt('" +
      password +
      "', gen_salt('sha256crypt')), 0, 0);"
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

export async function updateGuestFiles(email: String, fileCount: number) {
  const query = await ConnectionDB.query(
    "SELECT files_processed FROM guestUsers WHERE email ='" + email + "';"
  );

  const minusFiles = query.rows[0];
  console.log(minusFiles);

  const query2 = await ConnectionDB.query(
    "UPDATE files_processed SET files_processed=" +
      fileCount +
      " FROM guestUsers WHERE email ='" +
      email +
      "';"
  );
  const query3 = await ConnectionDB.query(
    "UPDATE files_processed SET files_processed=" +
      fileCount +
      " FROM guestUsers WHERE email ='" +
      email +
      "';"
  );

  return query.rows;
}
export async function getGuestRemainingUses(email: String) {
  const query = await ConnectionDB.query(
    "SELECT files_processed FROM guestUsers WHERE email ='" + email + "';"
  );
  return query.rows;
}

export async function createGuest(email: String) {
  const char = "TEST";
  const query = await ConnectionDB.query(
    "INSERT INTO guestusers (email, files_processed, summaries_made) VALUES ('" +
      email +
      "', 3, 0);"
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
  generateValidationCode();
  const query = await ConnectionDB.query(
    "UPDATE pendingusers SET validation_code='12345678' WHERE email='" +
      email +
      "';"
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
export async function updateUser(
  oldEmail: string,
  email: String,
  oldPpassword: String,
  password: string
) {
  const checkPass = await checkPassword(oldEmail, oldPpassword);
  if (checkPass == 1) {
    const query = await ConnectionDB.query(
      `UPDATE loggedUsers SET password=crypt('${password}', gen_salt('sha256crypt')), email='${email}' WHERE email='${oldEmail}';`
    );
    return query.rowCount;
  }
  ConnectionDB.end;
}

export async function addNote(user_id: string, title: string, content: string) {
  const user = await getUserID(user_id);
  const userID = user[0]["id"];
  if (user) {
    const query = await ConnectionDB.query(
      "INSERT INTO user_notes (user_id, title, content) VALUES ($1, $2, $3);",
      [userID, title, content]
    );
    ConnectionDB.end;
    return query.rowCount;
  }
  ConnectionDB.end;
}

export async function addSummary(
  user_id: string,
  title: string,
  summary_content: string
) {
  const user = await getUserID(user_id);
  const userID = user[0]["id"];
  console.log(title);
  if (user) {
    const query = await ConnectionDB.query(
      "INSERT INTO user_summaries (user_id, title, summary_content) VALUES ($1, $2, $3);",
      [userID, title, summary_content]
    );
    ConnectionDB.end;
    return query.rowCount;
  }
  ConnectionDB.end;
}

export async function getSummaries(user_id: string) {
  const user = await getUserID(decodeURIComponent(user_id));
  const userID = user[0].id;
  if (user) {
    const query = await ConnectionDB.query(
      "SELECT * FROM user_summaries WHERE user_id = $1",
      [userID]
    );
    ConnectionDB.end;
    return query.rows;
  }
  ConnectionDB.end;
}
export async function getNotes(user_id: string) {
  const user = await getUserID(decodeURIComponent(user_id));
  const userID = user[0].id;
  if (user) {
    const query = await ConnectionDB.query(
      "SELECT * FROM user_notes WHERE user_id = $1",
      [userID]
    );
    ConnectionDB.end;
    return query.rows;
  }
  ConnectionDB.end;
  ConnectionDB.end;
}
