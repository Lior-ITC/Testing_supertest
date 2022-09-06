const { query } = require("../lib/db");
const SQL = require("@nearform/sql");
const { v4: uuid } = require("uuid");

function getProducts() {
  return query(SQL`SELECT * FROM products`);
}

exports.getProducts = getProducts;

async function createProduct(name, price, category, userId) {
  const id = uuid();
  const createdDate = (new Date());
  createdDate.setHours(0);
  createdDate.setMinutes(0);
  createdDate.setSeconds(0);
  createdDate.setMilliseconds(0);
  const sql = SQL`INSERT INTO products (id, name, price, category, userId, created_date) VALUES (${id}, ${name}, ${price}, ${category}, ${userId}, ${createdDate})`;
  await query(sql);
  return { id, createdDate };
}

exports.createProduct = createProduct;

async function getProductById(id) {
  const sql = SQL`SELECT * FROM products WHERE id = ${id}`;
  const rows = await query(sql);
  return rows[0];
}

exports.getProductById = getProductById;

function getProductsByUserId(userId) {
  const sql = SQL`SELECT * FROM products WHERE userId = ${userId}`;
  return query(sql);
}
exports.getProductsByUserId = getProductsByUserId;

function deleteProduct(id) {
  const sql = SQL`DELETE FROM products WHERE id = ${id}`;
  return query(sql);
}
exports.deleteProduct = deleteProduct;
