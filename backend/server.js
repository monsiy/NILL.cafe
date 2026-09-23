const express = require("express");
const cors = require("cors");
const db = require("./database");

const productCount = db.prepare("SELECT COUNT(*) AS count FROM products").get();

if (productCount.count === 0) {
  require("./seed-menu");
}

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Cafe Backend is running!");
// });

app.post("/products", (req, res) => {
  const { name, category, subcategory, description, price, price2, image } =
    req.body;

  const stmt = db.prepare(`
    INSERT INTO products
    (name, category, subcategory, description, price, price2, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    name,
    category,
    subcategory || "",
    description || "",
    price,
    price2 || null,
    image || "",
  );

  res.json({
    message: "Product added successfully!",
    id: result.lastInsertRowid,
  });
});
app.get("/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();

  res.json(products);
});
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  const stmt = db.prepare("DELETE FROM products WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json({
    message: "Product deleted successfully!",
  });
});
app.put("/products/:id", (req, res) => {
  const id = req.params.id;

  const { name, category, subcategory, description, price, price2, image } =
    req.body;

  const stmt = db.prepare(`
    UPDATE products
    SET
      name = ?,
      category = ?,
      subcategory = ?,
      description = ?,
      price = ?,
      price2 = ?,
      image = ?
    WHERE id = ?
  `);

  const result = stmt.run(
    name,
    category,
    subcategory || "",
    description || "",
    price,
    price2 || null,
    image || "",
    id,
  );

  if (result.changes === 0) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json({
    message: "Product updated successfully!",
  });
});
// =========================
// مدیریت دسته‌بندی‌های منو
// =========================

// دریافت همه دسته‌بندی‌ها
app.get("/categories", (req, res) => {
  const categories = db
    .prepare("SELECT * FROM categories ORDER BY id ASC")
    .all();

  res.json(categories);
});

// اضافه کردن دسته‌بندی
app.post("/categories", (req, res) => {
  const { name, description, image } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Category name is required",
    });
  }

  const cleanName = name.trim();

  // بررسی دسته‌بندی تکراری
  const existingCategory = db
    .prepare(
      `
      SELECT id
      FROM categories
      WHERE LOWER(name) = LOWER(?)
    `,
    )
    .get(cleanName);

  if (existingCategory) {
    return res.status(400).json({
      message: "Ya existe una categoría con este nombre.",
    });
  }

  const stmt = db.prepare(`
    INSERT INTO categories
    (name, description, image)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(cleanName, description || "", image || "");

  res.json({
    message: "Category added successfully!",
    id: result.lastInsertRowid,
  });
});

// ویرایش دسته‌بندی
app.put("/categories/:id", (req, res) => {
  const id = req.params.id;

  const { name, description, image } = req.body;

  // پیدا کردن اسم قبلی دسته‌بندی
  const oldCategory = db
    .prepare("SELECT name FROM categories WHERE id = ?")
    .get(id);

  if (!oldCategory) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  // تغییر نام دسته‌بندی در محصولات
  db.prepare(
    `
    UPDATE products
    SET category = ?
    WHERE category = ?
  `,
  ).run(name, oldCategory.name);

  // تغییر اطلاعات خود دسته‌بندی
  const stmt = db.prepare(`
    UPDATE categories
    SET
      name = ?,
      description = ?,
      image = ?
    WHERE id = ?
  `);

  const result = stmt.run(name, description || "", image || "", id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.json({
    message: "Category updated successfully!",
  });
});

// حذف دسته‌بندی
app.delete("/categories/:id", (req, res) => {
  const id = req.params.id;

  // پیدا کردن دسته‌بندی
  const category = db
    .prepare("SELECT name FROM categories WHERE id = ?")
    .get(id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  // بررسی اینکه محصولی در این دسته وجود دارد یا نه
  const products = db
    .prepare("SELECT COUNT(*) AS count FROM products WHERE category = ?")
    .get(category.name);

  if (products.count > 0) {
    return res.status(400).json({
      message: "No se puede eliminar esta categoría porque tiene productos.",
    });
  }

  // حذف دسته‌بندی
  const stmt = db.prepare("DELETE FROM categories WHERE id = ?");

  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.json({
    message: "Category deleted successfully!",
  });
});
// =========================
// اضافه کردن دسته‌های پیش‌فرض
// =========================

const defaultCategories = [
  "Pizzas",
  "Raciones",
  "Hamburguesas",
  "Ensaladas",
  "Bebidas",
];

defaultCategories.forEach(function (name) {
  const exists = db
    .prepare("SELECT id FROM categories WHERE name = ?")
    .get(name);

  if (!exists) {
    db.prepare(
      `
            INSERT INTO categories
            (name, description, image)
            VALUES (?, ?, ?)
        `,
    ).run(name, "", "");
  }
});
const path = require("path");

app.use(express.static(path.join(__dirname, "..")));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
