const API_URL = "http://localhost:3000";

// =========================
// ابزارهای کمکی
// =========================

function escapeHTML(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =========================
// ساخت منوی دسته‌بندی‌ها
// =========================

async function loadMenu() {
  try {
    const categoriesResponse = await fetch(`${API_URL}/categories`);

    if (!categoriesResponse.ok) {
      throw new Error("Error al cargar categorías");
    }

    const categories = await categoriesResponse.json();

    const productsResponse = await fetch(`${API_URL}/products`);

    if (!productsResponse.ok) {
      throw new Error("Error al cargar productos");
    }

    const products = await productsResponse.json();

    const categoriesMenu = document.getElementById("categories-menu");

    const menuSections = document.getElementById("menu-sections");

    if (!categoriesMenu || !menuSections) {
      return;
    }

    // پاک کردن منوی قبلی
    categoriesMenu.innerHTML = "";
    menuSections.innerHTML = "";

    // =========================
    // ساخت دسته‌بندی‌ها
    // =========================

    categories.forEach(function (category, index) {
      const sectionId = `category-${category.id}`;

      // ---------- دکمه دسته‌بندی ----------

      const button = document.createElement("button");

      button.classList.add("category");

      if (index === 0) {
        button.classList.add("active");
      }

      button.textContent = category.name;

      button.dataset.category = sectionId;

      button.addEventListener("click", function () {
        const section = document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });

      categoriesMenu.appendChild(button);

      // ---------- بخش دسته‌بندی ----------

      const section = document.createElement("section");

      section.classList.add("menu-category");

      section.id = sectionId;

      section.innerHTML = `

                <div class="category-heading">

                    <h2>
                        ${escapeHTML(category.name)}
                    </h2>

                    ${
                      category.description
                        ? `
                                <p>
                                    ${escapeHTML(category.description)}
                                </p>
                              `
                        : ""
                    }

                </div>

                <div class="menu-items"></div>

            `;

      menuSections.appendChild(section);
    });

    // =========================
    // قرار دادن محصولات
    // =========================

    products.forEach(function (product) {
      const category = categories.find(function (item) {
        return (
          item.name.trim().toLowerCase() ===
          product.category.trim().toLowerCase()
        );
      });

      if (!category) {
        return;
      }

      const sectionId = `category-${category.id}`;

      const section = document.getElementById(sectionId);

      if (!section) {
        return;
      }

      const itemsContainer = section.querySelector(".menu-items");

      if (!itemsContainer) {
        return;
      }

      // =========================
      // پیدا کردن / ساخت زیر دسته
      // =========================

      let targetContainer = itemsContainer;

      if (product.subcategory && product.subcategory.trim() !== "") {
        const subcategoryName = product.subcategory.trim();

        let subcategoryBlock = Array.from(itemsContainer.children).find(
          function (element) {
            return (
              element.dataset &&
              element.dataset.subcategory === subcategoryName.toLowerCase()
            );
          },
        );

        if (!subcategoryBlock) {
          subcategoryBlock = document.createElement("div");

          subcategoryBlock.classList.add("subcategory-block");

          subcategoryBlock.dataset.subcategory = subcategoryName.toLowerCase();

          subcategoryBlock.innerHTML = `

                        <h3 class="sub-category">
                            ${escapeHTML(subcategoryName)}
                        </h3>

                        <div class="subcategory-items"></div>

                    `;

          itemsContainer.appendChild(subcategoryBlock);
        }

        targetContainer = subcategoryBlock.querySelector(".subcategory-items");
      }

      // =========================
      // ساخت محصول
      // =========================

      const productElement = document.createElement("div");

      productElement.classList.add("menu-item");

      // ---------- قیمت ----------

      let priceHTML = "";

      if (
        product.price !== null &&
        product.price !== undefined &&
        product.price !== ""
      ) {
        priceHTML = `
                    <span class="price">
                        ${product.price}€
                        ${
                          product.price2 !== null &&
                          product.price2 !== undefined &&
                          product.price2 !== ""
                            ? ` / ${product.price2}€`
                            : ""
                        }
                    </span>
                `;
      }

      // ---------- عکس ----------

      let imageHTML = "";

      if (product.image && product.image.trim() !== "") {
        imageHTML = `
                    <img
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                    >
                `;
      }

      // ---------- محصول ----------

      productElement.innerHTML = `

                <div class="menu-item-info">

                    <h3>
                        ${escapeHTML(product.name)}
                    </h3>

                    ${
                      product.description
                        ? `
                                <p>
                                    ${escapeHTML(product.description)}
                                </p>
                              `
                        : ""
                    }

                </div>

                ${imageHTML}

                ${priceHTML}

            `;

      targetContainer.appendChild(productElement);
    });

    // =========================
    // فعال کردن اسکرول دسته‌بندی‌ها
    // =========================

    setupCategoryScroll();
  } catch (error) {
    console.error("Error al cargar el menú:", error);
  }
}

// =========================
// دسته‌بندی فعال هنگام اسکرول
// =========================

function setupCategoryScroll() {
  const categories = document.querySelectorAll(".category");

  const sections = document.querySelectorAll(".menu-category");

  function updateActiveCategory() {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;

      if (window.scrollY >= sectionTop - 180) {
        currentSection = section.id;
      }
    });

    if (currentSection === "" && sections.length > 0) {
      currentSection = sections[0].id;
    }

    categories.forEach(function (category) {
      category.classList.remove("active");

      if (category.dataset.category === currentSection) {
        category.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveCategory);

  updateActiveCategory();
}

// =========================
// اجرای منو
// =========================

loadMenu();
