const { query } = require("../lib/db");
const SQL = require("@nearform/sql");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function addUser(email, passwordHash) {
  const id = uuid();
  const sql = SQL`INSERT INTO users (id, email, password_hash) VALUES (${id}, ${email}, ${passwordHash})`;
  await query(sql);
  return id;
}
exports.addUser = addUser;

async function getUserByEmail(email) {
  const rows = await query(SQL`SELECT * FROM users WHERE email=${email}`);
  return rows[0];
}
exports.getUserByEmail = getUserByEmail;

async function getUserById(userId) {
  const sql = SQL`SELECT * FROM users WHERE id = ${userId}`;
  const rows = await query(sql);
  return rows[0];
}
exports.getUserById = getUserById;

function updateUserPictureUrl(userId, pictureUrl) {
  const sql = SQL`UPDATE users SET picture_url = ${pictureUrl} WHERE id = ${userId}`;
  return query(sql);
}
exports.updateUserPictureUrl = updateUserPictureUrl;

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}
exports.hashPassword = hashPassword;

function generateUserToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
}
exports.generateUserToken = generateUserToken;

function deleteUser(userId) {
  return query(SQL`DELETE FROM users WHERE id = ${userId}`);
}
exports.deleteUser = deleteUser;