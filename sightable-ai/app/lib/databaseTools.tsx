import ConnectionDB from "./connectorDB";


// METHODS FOR LOGGED USERS
export async function getAllUsers() {
  const { rows } = await ConnectionDB.query("SELECT * FROM loggedUsers");
  ConnectionDB.end
  return rows;
}

export async function getUser(email: String, pass: String) {
  const query = await ConnectionDB.query(
    "SELECT email FROM loggedUsers WHERE email ='" + email  + "' AND password = crypt('" + pass + "', password);"
  );
  return query.rows[0];
}

export async function getPassWord(email: String) {
  const query = await ConnectionDB.query(
    "SELECT password FROM loggedUsers WHERE email ='" + email  + "'"
  );
  ConnectionDB.end
  return query.rows;
}

export async function checkPassword(email: String, pass: String) {
  const query = await ConnectionDB.query(
    "SELECT password FROM loggedUsers WHERE email ='" + email  + "' AND password = crypt('" + pass + "', password);"
  );
  return query.rowCount;
}

export async function getAllGuests() {
  const { rows } = await ConnectionDB.query(
    "SELECT * FROM guestUsers;"
  );
  return rows;
}

export async function getGuestUser(email: String) {
  const query = await ConnectionDB.query(
    "SELECT * FROM guestUsers WHERE email ='" + email  + "';"
  );
  return query.rows[0];
}

export async function checkGuestUser(email: String) {
  const query = await ConnectionDB.query(
    "SELECT email FROM guestUsers WHERE email ='" + email  + "';"
  );
  return query.rowCount;
}

export async function getGuestCharacteristic(email: String) {
  const query = await ConnectionDB.query(
    "SELECT characteristic FROM guestUsers WHERE email ='" + email  + "';"
  );
  return query.rows;
}
export async function getGuestRemainingUses(email: String) {
  const query = await ConnectionDB.query(
    "SELECT remaining_uses FROM guestUsers WHERE email ='" + email  + "';"
  );
  return query.rows;
}

export async function createGuest(email: String) {
  const char = "TEST";
  const query = await ConnectionDB.query("INSERT INTO guestusers (email, characteristic, remaining_uses) VALUES ('" + email + "', '" + char + "', 3);");
  ConnectionDB.end
  return query.rows;
}