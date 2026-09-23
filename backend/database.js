const Database = require("better-sqlite3");

const path = require("path");
const db = new Database(path.join(__dirname, "cafe.db"));

// =========================
// PRODUCTS TABLE
// =========================

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        subcategory TEXT,
        description TEXT,
        price REAL,
        price2 REAL,
        image TEXT
    )
`);

// =========================
// ADD NEW COLUMNS
// =========================

// اگر دیتابیس قدیمی باشد و این ستون‌ها را نداشته باشد، اضافه می‌شوند.

const productColumns = db.prepare("PRAGMA table_info(products)").all();

const columnNames = productColumns.map(function (column) {
  return column.name;
});

if (!columnNames.includes("subcategory")) {
  db.exec(`
        ALTER TABLE products
        ADD COLUMN subcategory TEXT
    `);
}

if (!columnNames.includes("price2")) {
  db.exec(`
        ALTER TABLE products
        ADD COLUMN price2 REAL
    `);
}

// =========================
// CATEGORIES TABLE
// =========================

db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        image TEXT
    )
`);

console.log("Database connected successfully!");

module.exports = db;
