const API_URL = "http://172.20.10.2:3000";

// =========================
// گرفتن عناصر
// =========================

const productName = document.getElementById("product-name");
const productCategory = document.getElementById("product-category");
const productSubcategory = document.getElementById("product-subcategory");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");
const productPrice2 = document.getElementById("product-price2");
const productImage = document.getElementById("product-image");

const addButton = document.querySelector(".add-product");
const adminMenu = document.getElementById("admin-menu");
const productsCount = document.getElementById("products-count");

// =========================
// وضعیت ویرایش محصول
// =========================

let editingProductId = null;
let editingImage = "";

// =========================
// تبدیل قیمت
// =========================

function parsePrice(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const cleanValue = String(value).replace(",", ".").replace("€", "").trim();

  const number = Number(cleanValue);

  if (Number.isNaN(number)) {
    return null;
  }

  return number;
}

// =========================
// نمایش محصولات در پنل
// =========================

async function showAdminMenu() {
  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      throw new Error("Error al cargar productos");
    }

    const products = await response.json();

    if (!adminMenu) {
      return;
    }

    adminMenu.innerHTML = "";

    productsCount.textContent = `${products.length} productos`;

    if (products.length === 0) {
      adminMenu.innerHTML = `
                <div class="empty-products">

                    <div>🍽️</div>

                    <h3>
                        No hay productos todavía
                    </h3>

                    <p>
                        Los productos que añadas
                        aparecerán aquí.
                    </p>

                </div>
            `;

      return;
    }
    products.forEach(function (product) {
      const productRow = document.createElement("div");

      productRow.classList.add("admin-product-row");

      productRow.innerHTML = `
        <div class="admin-product-photo">
            ${
              product.image
                ? `
                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >
                    `
                : `
                        <div class="admin-product-no-image">
                            📷
                        </div>
                    `
            }
        </div>

        <div class="admin-product-name">
            <strong>${product.name}</strong>

            ${
              product.subcategory
                ? `
                        <span class="admin-product-subcategory">
                            ${product.subcategory}
                        </span>
                    `
                : ""
            }
        </div>

        <div class="admin-product-category">
            <span>${product.category}</span>
        </div>

        <div class="admin-product-description">
            ${product.description ? product.description : "Sin descripción"}
        </div>

        <div class="admin-product-price">
            ${
              product.price !== null &&
              product.price !== undefined &&
              product.price !== ""
                ? `
                        <strong>
                            ${product.price} €
                            ${
                              product.price2 !== null &&
                              product.price2 !== undefined &&
                              product.price2 !== ""
                                ? ` / ${product.price2} €`
                                : ""
                            }
                        </strong>
                    `
                : `
                        <span class="no-price">
                            Sin precio
                        </span>
                    `
            }
        </div>

        <div class="admin-product-actions">
            <button
                class="edit-admin-product"
                data-id="${product.id}"
            >
                Editar
            </button>

            <button
                class="delete-admin-product"
                data-id="${product.id}"
            >
                Eliminar
            </button>
        </div>
    `;

      adminMenu.appendChild(productRow);
    });
  } catch (error) {
    console.error(error);

    if (adminMenu) {
      adminMenu.innerHTML = `
                <p>
                    Error al cargar el menú.
                </p>
            `;
    }
  }
}

// =========================
// کلیک روی Editar / Eliminar
// =========================

adminMenu.addEventListener("click", async function (event) {
  // =========================
  // ویرایش محصول
  // =========================

  if (event.target.classList.contains("edit-admin-product")) {
    const productId = event.target.dataset.id;

    try {
      const response = await fetch(`${API_URL}/products`);

      if (!response.ok) {
        throw new Error("Error al cargar el producto");
      }

      const products = await response.json();

      const product = products.find(function (item) {
        return String(item.id) === String(productId);
      });

      if (!product) {
        alert("Producto no encontrado.");

        return;
      }

      // ذخیره وضعیت ویرایش

      editingProductId = product.id;

      editingImage = product.image || "";

      // پر کردن فرم

      productName.value = product.name;

      productCategory.value = product.category;

      productSubcategory.value = product.subcategory || "";

      productDescription.value = product.description || "";

      productPrice.value = product.price ?? "";

      productPrice2.value = product.price2 ?? "";

      productImage.value = "";

      // تغییر دکمه

      addButton.textContent = "Guardar cambios";

      // رفتن به فرم

      document.querySelector(".product-form").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (error) {
      console.error(error);

      alert("Error al cargar el producto.");
    }
  }

  // =========================
  // حذف محصول
  // =========================

  if (event.target.classList.contains("delete-admin-product")) {
    const productId = event.target.dataset.id;

    const confirmDelete = confirm("¿Quieres eliminar este producto?");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      await showAdminMenu();

      alert("Producto eliminado correctamente.");
    } catch (error) {
      console.error(error);

      alert("Error al eliminar el producto.");
    }
  }
});

// =========================
// دکمه اصلی محصول
// =========================

addButton.addEventListener("click", function () {
  const name = productName.value.trim();

  const category = productCategory.value;

  const subcategory = productSubcategory.value.trim();

  const description = productDescription.value.trim();

  const price = productPrice.value.trim();

  const price2 = productPrice2.value.trim();

  const image = productImage.files[0];

  // بررسی نام محصول
  if (name === "") {
    alert("Por favor, introduce el nombre.");
    return;
  }

  // بررسی قیمت فقط اگر وارد شده باشد
  if (price !== "" && parsePrice(price) === null) {
    alert("Introduce un precio válido.");
    return;
  }
  // =========================
  // حالت ویرایش
  // =========================

  if (editingProductId !== null) {
    // اگر عکس جدید انتخاب شده

    if (image) {
      const reader = new FileReader();

      reader.onload = function () {
        updateProduct(
          name,
          category,
          subcategory,
          description,
          price,
          price2,
          reader.result,
        );
      };

      reader.readAsDataURL(image);
    } else {
      // حفظ عکس قبلی

      updateProduct(
        name,
        category,
        subcategory,
        description,
        price,
        price2,
        editingImage,
      );
    }

    return;
  }

  // =========================
  // حالت افزودن محصول جدید
  // =========================

  if (image) {
    const reader = new FileReader();

    reader.onload = function () {
      saveProduct(
        name,
        category,
        subcategory,
        description,
        price,
        price2,
        reader.result,
      );
    };

    reader.readAsDataURL(image);
  } else {
    saveProduct(name, category, subcategory, description, price, price2, "");
  }
});

// =========================
// ذخیره محصول جدید
// =========================

async function saveProduct(
  name,
  category,
  subcategory,
  description,
  price,
  price2,
  image,
) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,

        category: category,

        subcategory: subcategory,

        description: description,

        price: parsePrice(price),

        price2: parsePrice(price2),

        image: image,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el producto");
    }

    await response.json();

    resetForm();

    await showAdminMenu();

    alert("Producto añadido correctamente.");
  } catch (error) {
    console.error(error);

    alert("Error al guardar el producto.");
  }
}

// =========================
// ویرایش محصول
// =========================

async function updateProduct(
  name,
  category,
  subcategory,
  description,
  price,
  price2,
  image,
) {
  try {
    const response = await fetch(`${API_URL}/products/${editingProductId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,

        category: category,

        subcategory: subcategory,

        description: description,

        price: parsePrice(price),

        price2: parsePrice(price2),

        image: image,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }

    await response.json();

    resetForm();

    await showAdminMenu();

    alert("Producto actualizado correctamente.");
  } catch (error) {
    console.error(error);

    alert("Error al actualizar el producto.");
  }
}

// =========================
// ریست فرم محصول
// =========================

function resetForm() {
  productName.value = "";

  productCategory.value = "";

  productSubcategory.value = "";

  productDescription.value = "";

  productPrice.value = "";

  productPrice2.value = "";

  productImage.value = "";

  editingProductId = null;

  editingImage = "";

  addButton.textContent = "Añadir producto";
}

// =========================
// مدیریت دسته‌بندی‌ها
// =========================

const categoryName = document.getElementById("category-name");

const categoryDescription = document.getElementById("category-description");

const categoryImage = document.getElementById("category-image");

const addCategoryButton = document.querySelector(".add-category");

const categoriesList = document.getElementById("categories-list");

let editingCategoryId = null;

let editingCategoryImage = "";

// =========================
// نمایش دسته‌بندی‌ها
// =========================

async function showCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
      throw new Error("Error al cargar categorías");
    }

    const categories = await response.json();

    categoriesList.innerHTML = "";

    if (categories.length === 0) {
      categoriesList.innerHTML = `
                <p>
                    No hay categorías todavía.
                </p>
            `;

      return;
    }

    categories.forEach(function (category) {
      const categoryCard = document.createElement("div");

      categoryCard.classList.add("category-card");

      categoryCard.innerHTML = `

                ${
                  category.image
                    ? `
                            <img
                                src="${category.image}"
                                alt="${category.name}"
                            >
                          `
                    : `
                            <div class="no-category-image">
                                📷
                            </div>
                          `
                }

                <div class="category-info">

                    <h3>
                        ${category.name}
                    </h3>

                    <p>
                        ${category.description || ""}
                    </p>

                    <div class="category-actions">

                        <button
                            class="edit-category"
                            data-id="${category.id}"
                        >
                            Editar
                        </button>

                        <button
                            class="delete-category"
                            data-id="${category.id}"
                        >
                            Eliminar
                        </button>

                    </div>

                </div>

            `;

      categoriesList.appendChild(categoryCard);

      // ویرایش دسته

      const editButton = categoryCard.querySelector(".edit-category");

      editButton.addEventListener("click", function () {
        editingCategoryId = category.id;

        editingCategoryImage = category.image || "";

        categoryName.value = category.name;

        categoryDescription.value = category.description || "";

        categoryImage.value = "";

        addCategoryButton.textContent = "Guardar cambios";

        categoryName.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });

      // حذف دسته

      const deleteButton = categoryCard.querySelector(".delete-category");

      deleteButton.addEventListener("click", async function () {
        const categoryId = this.dataset.id;

        const confirmDelete = confirm("¿Quieres eliminar esta categoría?");

        if (!confirmDelete) {
          return;
        }

        try {
          const response = await fetch(`${API_URL}/categories/${categoryId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Error al eliminar la categoría");
          }

          await showCategories();

          await loadProductCategories();
        } catch (error) {
          console.error(error);

          alert("Error al eliminar la categoría.");
        }
      });
    });
  } catch (error) {
    console.error(error);

    categoriesList.innerHTML = `
            <p>
                Error al cargar las categorías.
            </p>
        `;
  }
}

// =========================
// دکمه Category
// =========================

addCategoryButton.addEventListener("click", function () {
  const name = categoryName.value.trim();

  const description = categoryDescription.value.trim();

  const image = categoryImage.files[0];

  if (name === "") {
    alert("Por favor, introduce el nombre de la categoría.");

    return;
  }

  // =========================
  // ویرایش Category
  // =========================

  if (editingCategoryId !== null) {
    if (image) {
      const reader = new FileReader();

      reader.onload = function () {
        updateCategory(name, description, reader.result);
      };

      reader.readAsDataURL(image);
    } else {
      updateCategory(name, description, editingCategoryImage);
    }

    return;
  }

  // =========================
  // افزودن Category
  // =========================

  if (image) {
    const reader = new FileReader();

    reader.onload = function () {
      saveCategory(name, description, reader.result);
    };

    reader.readAsDataURL(image);
  } else {
    saveCategory(name, description, "");
  }
});

// =========================
// ذخیره Category
// =========================

async function saveCategory(name, description, image) {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,

        description: description,

        image: image,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al guardar la categoría");
    }

    await response.json();

    resetCategoryForm();

    await showCategories();

    await loadProductCategories();

    alert("Categoría añadida correctamente.");
  } catch (error) {
    console.error(error);

    alert("Error al guardar la categoría.");
  }
}

// =========================
// ویرایش Category
// =========================

async function updateCategory(name, description, image) {
  try {
    const response = await fetch(`${API_URL}/categories/${editingCategoryId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,

        description: description,

        image: image,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la categoría");
    }

    await response.json();

    resetCategoryForm();

    await showCategories();

    await loadProductCategories();

    alert("Categoría actualizada correctamente.");
  } catch (error) {
    console.error(error);

    alert("Error al actualizar la categoría.");
  }
}

// =========================
// ریست Category
// =========================

function resetCategoryForm() {
  categoryName.value = "";

  categoryDescription.value = "";

  categoryImage.value = "";

  editingCategoryId = null;

  editingCategoryImage = "";

  addCategoryButton.textContent = "Añadir categoría";
}

// =========================
// پر کردن Select دسته‌بندی
// =========================

async function loadProductCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
      throw new Error("Error al cargar categorías");
    }

    const categories = await response.json();

    productCategory.innerHTML = `
            <option value="">
                Seleccionar categoría
            </option>
        `;

    categories.forEach(function (category) {
      const option = document.createElement("option");

      option.value = category.name;

      option.textContent = category.name;

      productCategory.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

// =========================
// اجرای اولیه
// =========================

loadProductCategories();

showCategories();

showAdminMenu();
