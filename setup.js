const fs = require("fs");
const folders = [
  "src/models",
  "src/lib",
  "src/services",
  "src/components",
  "src/app/dashboard/ventas/nueva",
  "src/app/dashboard/productos/nuevo",
  "src/app/dashboard/clientes/nuevo",
  "src/app/api/auth",
  "src/app/api/productos",
  "src/app/api/clientes",
  "src/app/api/ventas",
  "src/app/api/factura",
];

const files = [
  "src/models/User.ts",
  "src/models/Producto.ts",
  "src/models/Cliente.ts",
  "src/models/Venta.ts",
  "src/models/Factura.ts",
  "src/lib/mongodb.ts",
  "src/lib/auth.ts",
  "src/services/ventaService.ts",
  "src/services/facturaService.ts",
];

folders.forEach(folder => {
  fs.mkdirSync(folder, { recursive: true });
});

files.forEach(file => {
  fs.writeFileSync(file, "");
});

console.log("✅ Estructura creada correctamente");

