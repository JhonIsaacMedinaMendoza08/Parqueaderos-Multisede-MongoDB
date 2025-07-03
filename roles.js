// ==============================
// 1. Crear Roles
// ==============================
db.createRole({
  role: "administrador",
  privileges: [], 
  roles: [
    { role: "readWrite", db: "parqueaderos_multisede" },
    { role: "dbAdmin", db: "parqueaderos_multisede" },
    { role: "userAdmin", db: "parqueaderos_multisede" }
  ]
});

db.createRole({
  role: "empleado",
  privileges: [
    // Puede leer clientes y vehículos
    { resource: { db: "parqueaderos_multisede", collection: "usuarios" }, actions: ["find"] },
    { resource: { db: "parqueaderos_multisede", collection: "vehiculos" }, actions: ["find"] },
    // Puede registrar ingresos y salidas de parqueos
    { resource: { db: "parqueaderos_multisede", collection: "parqueos" }, actions: ["insert", "update", "find"] },
    // Puede leer zonas y sedes (solo lectura)
    { resource: { db: "parqueaderos_multisede", collection: "zonas" }, actions: ["find"] },
    { resource: { db: "parqueaderos_multisede", collection: "sedes" }, actions: ["find"] }
  ],
  roles: []
});
db.updateRole("empleado", {
  privileges: [
    { resource: { db: "parqueaderos_multisede", collection: "usuarios" }, actions: ["find"] },
    { resource: { db: "parqueaderos_multisede", collection: "vehiculos" }, actions: ["find"] },
    { resource: { db: "parqueaderos_multisede", collection: "parqueos" }, actions: ["insert", "update", "find"] },
    { resource: { db: "parqueaderos_multisede", collection: "zonas" }, actions: ["find", "update"] },
    { resource: { db: "parqueaderos_multisede", collection: "sedes" }, actions: ["find"] }
    
  ]
});

db.createRole({
  role: "cliente",
  privileges: [
    // Solo lectura propia
    { resource: { db: "parqueaderos_multisede", collection: "usuarios" }, actions: ["find"] },
    { resource: { db: "parqueaderos_multisede", collection: "parqueos" }, actions: ["find"] },
    // Lectura general zonas y precios
    { resource: { db: "parqueaderos_multisede", collection: "zonas" }, actions: ["find"] },
  ],
  roles: []
});

// ==============================
// 2. Crear usuarios con sus roles
// ==============================

// Crear usuario administrador
db.createUser({
  user: "adminNorteId",
  pwd: "admin123",
  roles: [ { role: "administrador", db: "parqueaderos_multisede" } ]
});

// Crear usuario empleado
db.createUser({
  user: "empleado1",
  pwd: "empleado123",
  roles: [ { role: "empleado", db: "parqueaderos_multisede" } ]
});

// Crear usuario cliente
db.createUser({
  user: "cliente",
  pwd: "cliente123",
  roles: [ { role: "cliente", db: "parqueaderos_multisede" } ]
});

