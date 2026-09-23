const db = require("./database");

// =========================
// منوی اصلی رستوران
// =========================

const products = [
  // =========================
  // PIZZAS - SALSA TOMATE
  // =========================

  {
    name: "MADRID",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Pepperoni, Bacon, Cebolla y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "BARCELONA",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Pollo, Bacon, Champiñones y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "TEHRAN",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Carne Picada, Cebolla, Pimiento verde y rojo, Champiñones y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "MEXICO CITY",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Carne Picada, Jalapeños, Pimiento rojo y verde y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "L.A",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Carne Picada, Cebolla, Pimiento y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "PANAMA",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description: "Salsa de tomate, Mozzarella, Jamón York, Piña y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "MILAN",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Jamón y Pimiento Negro y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "HUELVA",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Jamón Serrano, Tomate Cherry y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "BERLIN",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Jamón York, Pimiento rojo y verde, Aceitunas verde y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "MARBELLA",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description: "Salsa de tomate, Mozzarella, Atún, Gambas, Cebolla y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "LYON",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Anchoas, Aceitunas verde y negra y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "QUITTO",
    category: "Pizzas",
    subcategory: "SALSA TOMATE",
    description:
      "Salsa de tomate, Mozzarella, Atún, Cebolla, Pimiento verde y rojo, Champiñones y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  // =========================
  // PIZZAS - SALSA BBQ
  // =========================

  {
    name: "LAS VEGAS",
    category: "Pizzas",
    subcategory: "SALSA BBQ",
    description:
      "Salsa BBQ, Mozzarella, Carne Picada, Bacon, Cebolla y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "PORTO",
    category: "Pizzas",
    subcategory: "SALSA BBQ",
    description: "Salsa BBQ, Mozzarella, Pollo, Bacon, Cebolla, Maíz y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "ATHENS",
    category: "Pizzas",
    subcategory: "SALSA BBQ",
    description: "Salsa BBQ, Mozzarella, Carne Picada, Pollo y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  // =========================
  // PIZZAS - VEGETARIANAS
  // =========================

  {
    name: "SHANGHAI",
    category: "Pizzas",
    subcategory: "VEGETARIANAS",
    description:
      "Salsa de tomate, Mozzarella, Cebolla, Champiñones, Pimiento rojo y verde, Aceitunas verde y negra, Albahaca y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "LONDON",
    category: "Pizzas",
    subcategory: "VEGETARIANAS",
    description:
      "Salsa de tomate, Mozzarella, Aceitunas negra, Cebolla, Tomate cherry y Espinaca y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "TOKYO",
    category: "Pizzas",
    subcategory: "VEGETARIANAS",
    description:
      "Salsa de tomate, Mozzarella, Cebolla, Aceituna negra y verde, Aguacate y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "ROME",
    category: "Pizzas",
    subcategory: "VEGETARIANAS",
    description: "Salsa de tomate, Mozzarella, Rúcula y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "PARIS",
    category: "Pizzas",
    subcategory: "VEGETARIANAS",
    description: "Salsa de tomate, Mozzarella, 3 quesos y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "BUDAPEST",
    category: "Pizzas",
    subcategory: "VEGETARIANAS",
    description:
      "Salsa BBQ, Mozzarella, Champiñones, Maíz, Cebolla, Albahaca y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  // =========================
  // PIZZAS - SALSA BLANCA
  // =========================

  {
    name: "KYIV",
    category: "Pizzas",
    subcategory: "SALSA BLANCA",
    description:
      "Salsa Alfredo, Mozzarella, Champiñones, Pollo, Cebolla y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "ZURICH",
    category: "Pizzas",
    subcategory: "SALSA BLANCA",
    description: "Salsa Alfredo, Mozzarella, Champiñones, Cebolla y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  {
    name: "ALP",
    category: "Pizzas",
    subcategory: "SALSA BLANCA",
    description:
      "Salsa nata, Mozzarella, Queso de cabra, Cebolla caramelizada y Orégano",
    price: 13.95,
    price2: 19.95,
  },

  // =========================
  // RACIONES
  // =========================

  {
    name: "TORREZNOS",
    category: "Raciones",
    price: 12.5,
  },

  {
    name: "ALITAS DE POLLO",
    category: "Raciones",
    price: 11.5,
  },

  {
    name: "NUGGETS DE POLLO",
    category: "Raciones",
    price: 9.5,
  },

  {
    name: "CROQUETAS DE JAMÓN",
    category: "Raciones",
    price: 9.5,
  },

  {
    name: "CROQUETAS DE POLLO",
    category: "Raciones",
    price: 9.5,
  },

  {
    name: "NACHOS",
    category: "Raciones",
    price: 10.5,
  },

  {
    name: "PATATAS FRITAS",
    category: "Raciones",
    price: 5.0,
  },

  {
    name: "PATATAS BRAVAS",
    category: "Raciones",
    price: 7.0,
  },

  {
    name: "PATATAS MIXTAS",
    category: "Raciones",
    price: 7.5,
  },

  {
    name: "HOJAS DE PARRA RELLENAS",
    category: "Raciones",
    price: 9.0,
  },

  {
    name: "SALCHIPAPAS",
    category: "Raciones",
    price: 7.5,
  },

  {
    name: "PATATAS BACON & CHEESE",
    category: "Raciones",
    price: 10.0,
  },

  {
    name: "AROS DE CEBOLLA",
    category: "Raciones",
    price: 7.0,
  },

  {
    name: "CALAMARES",
    category: "Raciones",
    price: 14.5,
  },

  {
    name: "RABAS",
    category: "Raciones",
    price: 13.0,
  },

  {
    name: "TIRAS DE POLLO CON PATATAS",
    category: "Raciones",
    price: 12.5,
  },

  {
    name: "TEQUEÑOS",
    category: "Raciones",
    price: 11.5,
  },

  {
    name: "FINGER DE MERLUZA",
    category: "Raciones",
    price: 11.0,
  },

  {
    name: "HUEVOS ROTOS CON JAMÓN SERRANO",
    category: "Raciones",
    price: 11.5,
  },

  {
    name: "FINGER DE QUESO",
    category: "Raciones",
    price: 10.0,
  },

  {
    name: "CREMA DE BERENJENA",
    category: "Raciones",
    price: 11.0,
  },

  // =========================
  // HAMBURGUESAS
  // =========================

  {
    name: "HAMBURGUESA ANGUS",
    category: "Hamburguesas",
    description: "Carne 220 gr, lechuga, tomate, champiñón, queso y salsa",
    price: 15.5,
  },

  {
    name: "HAMBURGUESA BBQ",
    category: "Hamburguesas",
    description: "Carne, bacon, queso y salsa BBQ",
    price: 11.5,
  },

  {
    name: "HAMBURGUESA NIL",
    category: "Hamburguesas",
    description: "Carne, bacon, cebolla caramelizada y queso de cabra",
    price: 14.0,
  },

  {
    name: "HAMBURGUESA COMPLETA",
    category: "Hamburguesas",
    description:
      "Carne, lechuga, tomate, cebolla, huevo, bacon, queso y salsas",
    price: 13.0,
  },

  {
    name: "HAMBURGUESA CHEESE BACON",
    category: "Hamburguesas",
    description: "Carne, lechuga, tomate, bacon, queso y salsa",
    price: 12.0,
  },

  {
    name: "CHICKEN BURGER",
    category: "Hamburguesas",
    description: "Pollo, lechuga, tomate, bacon, queso y salsas",
    price: 11.5,
  },

  // =========================
  // ENSALADAS
  // =========================

  {
    name: "CÉSAR",
    category: "Ensaladas",
    description: "Lechuga, pollo, picatostes, queso parmesano, salsa César",
    price: 12.0,
  },

  {
    name: "NIL",
    category: "Ensaladas",
    description:
      "Lechuga, tomate cherry, cebolla, queso de cabra, ajo, pollo, maíz",
    price: 14.5,
  },

  {
    name: "MIXTA",
    category: "Ensaladas",
    description: "Lechuga, tomate, cebolla, atún, huevo y aceitunas",
    price: 10.0,
  },

  {
    name: "HAWAIANA",
    category: "Ensaladas",
    description: "Lechuga, tomate, cebolla, piña, maíz, aceitunas y salsa rosa",
    price: 11.0,
  },

  // =========================
  // BEBIDAS
  // قیمت‌ها فعلاً ندارند
  // =========================

  {
    name: "CÓCTELES",
    category: "Bebidas",
  },

  {
    name: "REFRESCOS",
    category: "Bebidas",
  },

  {
    name: "AGUA",
    category: "Bebidas",
  },

  {
    name: "ZUMOS",
    category: "Bebidas",
  },

  {
    name: "COPA DE CERVEZA",
    category: "Bebidas",
  },

  {
    name: "JARRA DE CERVEZA",
    category: "Bebidas",
  },

  {
    name: "TINTO DE VERANO",
    category: "Bebidas",
  },

  {
    name: "TERCIO MAHOU",
    category: "Bebidas",
  },

  {
    name: "TERCIO SIN GLUTEN",
    category: "Bebidas",
  },

  {
    name: "TERCIO 1906",
    category: "Bebidas",
  },

  {
    name: 'TERCIO "00" TOSTADA',
    category: "Bebidas",
  },

  {
    name: "ALHAMBRA VERDE Y ROJA",
    category: "Bebidas",
  },

  {
    name: "MAESTRA",
    category: "Bebidas",
  },

  {
    name: "ESTRELLA GALICIA",
    category: "Bebidas",
  },

  {
    name: "VINO",
    category: "Bebidas",
  },

  {
    name: "VERMUT",
    category: "Bebidas",
  },

  {
    name: "COPA LICOR",
    category: "Bebidas",
  },

  {
    name: "COPA IMPORTACIÓN",
    category: "Bebidas",
  },

  {
    name: "COPA VIP",
    category: "Bebidas",
  },

  {
    name: "BOTELLA DE VINO",
    category: "Bebidas",
  },
];

// =========================
// وارد کردن محصولات
// =========================

const insertProduct = db.prepare(`
    INSERT INTO products
    (
        name,
        category,
        subcategory,
        description,
        price,
        price2,
        image
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction(function () {
  products.forEach(function (product) {
    insertProduct.run(
      product.name,
      product.category,
      product.subcategory || "",
      product.description || "",
      product.price ?? null,
      product.price2 ?? null,
      "",
    );
  });
});

insertMany();

console.log("");
console.log("=================================");
console.log("MENU IMPORTED SUCCESSFULLY!");
console.log("=================================");
console.log(`Total products: ${products.length}`);
console.log("");
