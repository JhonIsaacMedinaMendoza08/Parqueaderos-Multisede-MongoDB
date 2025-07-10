// ==============================
// 1. Crear Roles
// ==============================

// ADMINISTRADOR: permisos totales
db.createRole({
  role: "administrador",
  privileges: [],
  roles: [
    { role: "readWrite", db: "parqueaderos_multisede" },
    { role: "dbAdmin", db: "parqueaderos_multisede" },
    { role: "userAdmin", db: "parqueaderos_multisede" }
  ]
});

// EMPLEADO: lectura/escritura limitada
db.createRole({
  role: "empleado",
  privileges: [
    { resource: { db: "parqueaderos_multisede", collection: "usuarios" }, actions: ["find"] },
    { resource: { db: "parqueaderos_multisede", collection: "parqueos" }, actions: ["insert", "update", "find"] },
    { resource: { db: "parqueaderos_multisede", collection: "sedes" }, actions: ["find", "update"] }
  ],
  roles: []
});

// CLIENTE: lectura básica
db.createRole({
  role: "cliente",
  privileges: [
    { resource: { db: "parqueaderos_multisede", collection: "usuarios" }, actions: ["find"] }, // se controla en app
    { resource: { db: "parqueaderos_multisede", collection: "parqueos" }, actions: ["find"] },
    { resource: { db: "parqueaderos_multisede", collection: "sedes" }, actions: ["find"] }
  ],
  roles: []
});

// ==============================
// 2. Crear usuarios con sus roles
// ==============================

db.createUser({
  user: "adminNorteId",
  pwd: "admin123",
  roles: [ { role: "administrador", db: "parqueaderos_multisede" } ]
});

db.createUser({
  user: "empleado1",
  pwd: "empleado123",
  roles: [ { role: "empleado", db: "parqueaderos_multisede" } ]
});

db.createUser({
  user: "cliente",
  pwd: "cliente123",
  roles: [ { role: "cliente", db: "parqueaderos_multisede" } ]
});
