// ==============================
// Insertar SEDES
// ==============================
// Crear sedes con zonas embebidas

var sedeNorteId = ObjectId();
var sedeCentroId = ObjectId();
var sedeSurId = ObjectId();

// Predefinir zonas con _id para usar en parqueos
var zonaA1 = ObjectId();
var zonaA2 = ObjectId();
var zonaA3 = ObjectId();
var zonaA4 = ObjectId();
var zonaA5 = ObjectId();
var zonaB1 = ObjectId();
var zonaB2 = ObjectId();
var zonaB3 = ObjectId();
var zonaB4 = ObjectId();
var zonaB5 = ObjectId();
var zonaC1 = ObjectId();
var zonaC2 = ObjectId();
var zonaC3 = ObjectId();
var zonaC4 = ObjectId();
var zonaC5 = ObjectId();

// Insertar sedes con zonas embebidas

db.sedes.insertMany([
  {
    _id: sedeNorteId,
    nombre: "Sede Norte",
    direccion: "Cra. 45 #120-55",
    ciudad: "Bogotá",
    telefono: "3101112233",
    zonas: [
      { _id: zonaA1, nombre: "Zona A1", tipos_vehiculo: ["carro"], capacidad: 10, cupos_disponibles: 10, tarifa_hora: 2500 },
      { _id: zonaA2, nombre: "Zona A2", tipos_vehiculo: ["camion"], capacidad: 5, cupos_disponibles: 5, tarifa_hora: 5500 },
      { _id: zonaA3, nombre: "Zona A3", tipos_vehiculo: ["bicicleta"], capacidad: 8, cupos_disponibles: 8, tarifa_hora: 1000 },
      { _id: zonaA4, nombre: "Zona A4", tipos_vehiculo: ["moto"], capacidad: 20, cupos_disponibles: 20, tarifa_hora: 1500 },
      { _id: zonaA5, nombre: "Zona A5", tipos_vehiculo: ["cuatrimoto"], capacidad: 10, cupos_disponibles: 10, tarifa_hora: 2000 }
    ]
  },
  {
    _id: sedeCentroId,
    nombre: "Sede Centro",
    direccion: "Cl. 10 #35-20",
    ciudad: "Medellín",
    telefono: "3152469587",
    zonas: [
      { _id: zonaB1, nombre: "Zona B1", tipos_vehiculo: ["carro"], capacidad: 10, cupos_disponibles: 10, tarifa_hora: 3000 },
      { _id: zonaB2, nombre: "Zona B2", tipos_vehiculo: ["camion"], capacidad: 5, cupos_disponibles: 5, tarifa_hora: 6000 },
      { _id: zonaB3, nombre: "Zona B3", tipos_vehiculo: ["vehiculoElectrico"], capacidad: 8, cupos_disponibles: 8, tarifa_hora: 2500 },
      { _id: zonaB4, nombre: "Zona B4", tipos_vehiculo: ["moto"], capacidad: 20, cupos_disponibles: 20, tarifa_hora: 2000 },
      { _id: zonaB5, nombre: "Zona B5", tipos_vehiculo: ["cuatrimoto"], capacidad: 10, cupos_disponibles: 10, tarifa_hora: 2500 }
    ]
  },
  {
    _id: sedeSurId,
    nombre: "Sede Sur",
    direccion: "Av. Malpaso #80-15",
    ciudad: "Cali",
    telefono: "3153809684",
    zonas: [
      { _id: zonaC2, nombre: "Zona C2", tipos_vehiculo: ["camion"], capacidad: 25, cupos_disponibles: 25, tarifa_hora: 5000 },
      { _id: zonaC1, nombre: "Zona C1", tipos_vehiculo: ["carro"], capacidad: 20, cupos_disponibles: 20, tarifa_hora: 2000 },
      { _id: zonaC3, nombre: "Zona C3", tipos_vehiculo: ["bus"], capacidad: 15, cupos_disponibles: 15, tarifa_hora: 4200 },
      { _id: zonaC4, nombre: "Zona C4", tipos_vehiculo: ["moto"], capacidad: 20, cupos_disponibles: 20, tarifa_hora: 1500 },
      { _id: zonaC5, nombre: "Zona C5", tipos_vehiculo: ["furgoneta"], capacidad: 15, cupos_disponibles: 15, tarifa_hora: 2500 }
    ]
  }
]);


// ==============================
// Insertar USUARIOS - ADMINISTRADORES
// ==============================

var adminNorteId = db.usuarios.insertOne({ nombre: "Carlos Ríos", cedula: "1001234567", email: "carlos.rios@norte.com", rol: "administrador", clave: "admin123", sede_id: sedeNorteId, fecha_creacion: new Date("2024-01-01"), suscripcion: null }).insertedId;
var adminCentroId = db.usuarios.insertOne({ nombre: "María Gómez", cedula: "1002234567", email: "maria.gomez@centro.com", rol: "administrador", clave: "admin123", sede_id: sedeCentroId, fecha_creacion: new Date("2024-01-02"), suscripcion: null }).insertedId;
var adminSurId = db.usuarios.insertOne({ nombre: "Julián Torres", cedula: "1003234567", email: "julian.torres@sur.com", rol: "administrador", clave: "admin123", sede_id: sedeSurId, fecha_creacion: new Date("2024-01-03"), suscripcion: null }).insertedId;

// ==============================
// Insertar USUARIOS - EMPLEADOS (3 por sede)
// ==============================

var empleado1 = db.usuarios.insertOne({ nombre: "Andrea Martínez", cedula: "1004000001", email: "andrea@norte.com", rol: "empleado", clave: "empleado123", sede_id: sedeNorteId, fecha_creacion: new Date("2024-03-01"), suscripcion: null }).insertedId;
var empleado2 = db.usuarios.insertOne({ nombre: "Luis Ramírez", cedula: "1004000002", email: "luis@norte.com", rol: "empleado", clave: "empleado123", sede_id: sedeNorteId, fecha_creacion: new Date("2024-03-05"), suscripcion: null }).insertedId;
var empleado3 = db.usuarios.insertOne({ nombre: "Tatiana Acosta", cedula: "1004000003", email: "tatiana@norte.com", rol: "empleado", clave: "empleado123", sede_id: sedeNorteId, fecha_creacion: new Date("2024-03-25"), suscripcion: null }).insertedId;

var empleado4 = db.usuarios.insertOne({ nombre: "Daniela Pérez", cedula: "1004000004", email: "daniela@centro.com", rol: "empleado", clave: "empleado123", sede_id: sedeCentroId, fecha_creacion: new Date("2024-03-07"), suscripcion: null }).insertedId;
var empleado5 = db.usuarios.insertOne({ nombre: "Juan Herrera", cedula: "1004000005", email: "juan@centro.com", rol: "empleado", clave: "empleado123", sede_id: sedeCentroId, fecha_creacion: new Date("2024-03-09"), suscripcion: null }).insertedId;
var empleado6 = db.usuarios.insertOne({ nombre: "Laura Mendoza", cedula: "1004000006", email: "laura@centro.com", rol: "empleado", clave: "empleado123", sede_id: sedeCentroId, fecha_creacion: new Date("2024-03-10"), suscripcion: null }).insertedId;

var empleado7 = db.usuarios.insertOne({ nombre: "Santiago Ruiz", cedula: "1004000007", email: "santiago@sur.com", rol: "empleado", clave: "empleado123", sede_id: sedeSurId, fecha_creacion: new Date("2024-03-15"), suscripcion: null }).insertedId;
var empleado8 = db.usuarios.insertOne({ nombre: "Valentina López", cedula: "1004000008", email: "valentina@sur.com", rol: "empleado", clave: "empleado123", sede_id: sedeSurId, fecha_creacion: new Date("2024-03-18"), suscripcion: null }).insertedId;
var empleado9 = db.usuarios.insertOne({ nombre: "David Gómez", cedula: "1004000009", email: "david@sur.com", rol: "empleado", clave: "empleado123", sede_id: sedeSurId, fecha_creacion: new Date("2024-03-20"), suscripcion: null }).insertedId;

// ==============================
// Insertar USUARIOS - CLIENTES CON VEHICULOS EMBEBIDOS
// ==============================

db.usuarios.insertMany([
  {
    nombre: "Ana Torres",
    cedula: "1010000001",
    email: "ana@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeCentroId,
    fecha_creacion: new Date("2024-04-01"),
    suscripcion: { tipo: "mensual" },
    vehiculos: [
      { tipo: "camion", marca: "Hino", modelo: "300", placa: "TXU997" },
      { tipo: "moto", marca: "Yamaha", modelo: "FZ 2.0", placa: "YMC21F" }
    ]
  },
  {
    nombre: "Jorge Peña",
    cedula: "1010000002",
    email: "jorge@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeCentroId,
    fecha_creacion: new Date("2024-04-02"),
    suscripcion: { tipo: "diario" },
    vehiculos: [
      { tipo: "bicicleta", marca: "Trek", modelo: "Marlin", placa: null },
      { tipo: "carro", marca: "Mazda", modelo: "3", placa: "RDF345" }
    ]
  },
  {
    nombre: "Camila Silva",
    cedula: "1010000003",
    email: "camila@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeNorteId,
    fecha_creacion: new Date("2024-04-03"),
    suscripcion: { tipo: "anual" },
    vehiculos: [
      { tipo: "carro", marca: "Toyota", modelo: "Corolla", placa: "WFV378" },
      { tipo: "vehiculoElectrico", marca: "Tesla", modelo: "Model 3", placa: "VHN832" }
    ]
  },
  {
    nombre: "Andrés Molina",
    cedula: "1010000004",
    email: "andres@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeSurId,
    fecha_creacion: new Date("2024-04-04"),
    suscripcion: null,
    vehiculos: [
      { tipo: "bus", marca: "Volkswagen", modelo: "9-150", placa: "XHU161" },
      { tipo: "cuatrimoto", marca: "Can-Am", modelo: "Outlander", placa: "HTR32M" }
    ]
  },
  {
    nombre: "Karen Díaz",
    cedula: "1010000005",
    email: "karen@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeNorteId,
    fecha_creacion: new Date("2024-04-05"),
    suscripcion: { tipo: "trimestral" },
    vehiculos: [
      { tipo: "carro", marca: "Toyota", modelo: "Corolla", placa: "WZQ423" },
      { tipo: "bicicleta", marca: "Specialized", modelo: "Rockhopper", placa: null }
    ]
  },
  {
    nombre: "Esteban Rico",
    cedula: "1010000006",
    email: "esteban@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeSurId,
    fecha_creacion: new Date("2024-04-06"),
    suscripcion: { tipo: "mensual" },
    vehiculos: [
      { tipo: "camion", marca: "Chevrolet", modelo: "NHR", placa: "LPR134" },
      { tipo: "furgoneta", marca: "Renault", modelo: "Kangoo", placa: "PTV490" }
    ]
  },
  {
    nombre: "Natalia Garzón",
    cedula: "1010000007",
    email: "natalia@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeCentroId,
    fecha_creacion: new Date("2024-04-07"),
    suscripcion: null,
    vehiculos: [
      { tipo: "moto", marca: "AKT", modelo: "NKD 125", placa: "AKT91C" }
    ]
  },
  {
    nombre: "Pedro Barrios",
    cedula: "1010000008",
    email: "pedro@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeCentroId,
    fecha_creacion: new Date("2024-04-08"),
    suscripcion: { tipo: "semestral" },
    vehiculos: [
      { tipo: "carro", marca: "Chevrolet", modelo: "Sail", placa: "YUL763" },
      { tipo: "vehiculoElectrico", marca: "BYD", modelo: "Dolphin", placa: "EQC124" }
    ]
  },
  {
    nombre: "Melissa Rojas",
    cedula: "1010000009",
    email: "melissa@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeNorteId,
    fecha_creacion: new Date("2024-04-09"),
    suscripcion: null,
    vehiculos: [
      { tipo: "bicicleta", marca: "Giant", modelo: "Talon 3", placa: null },
      { tipo: "carro", marca: "Hyundai", modelo: "i20", placa: "HTW823" }
    ]
  },
  {
    nombre: "Carlos Mendoza",
    cedula: "1010000010",
    email: "carlos@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeSurId,
    fecha_creacion: new Date("2024-04-10"),
    suscripcion: null,
    vehiculos: [
      { tipo: "moto", marca: "Suzuki", modelo: "Gixxer", placa: "SUZ63N" },
      { tipo: "camion", marca: "Dongfeng", modelo: "DFL3251A", placa: "KYZ772" }
    ]
  },
  {
    nombre: "Lucía Páez",
    cedula: "1010000011",
    email: "lucia@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeCentroId,
    fecha_creacion: new Date("2024-04-11"),
    suscripcion: { tipo: "anual" },
    vehiculos: [
      { tipo: "carro", marca: "Nissan", modelo: "Versa", placa: "CVP638" },
      { tipo: "bus", marca: "Mercedes-Benz", modelo: "O500", placa: "VXZ920" }
    ]
  },
  {
    nombre: "Mario Cortés",
    cedula: "1010000012",
    email: "mario@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeNorteId,
    fecha_creacion: new Date("2024-04-12"),
    suscripcion: { tipo: "mensual" },
    vehiculos: [
      { tipo: "cuatrimoto", marca: "Yamaha", modelo: "Raptor 700", placa: "QUA39G" },
      { tipo: "carro", marca: "Ford", modelo: "Focus", placa: "PQR271" }
    ]
  },
  {
    nombre: "Laura Niño",
    cedula: "1010000013",
    email: "laura@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeSurId,
    fecha_creacion: new Date("2024-04-13"),
    suscripcion: { tipo: "semanal" },
    vehiculos: [
      { tipo: "carro", marca: "Peugeot", modelo: "208", placa: "JLU991" },
      { tipo: "moto", marca: "Bajaj", modelo: "Pulsar", placa: "BAJ82T" }
    ]
  },
  {
    nombre: "Diego Suárez",
    cedula: "1010000014",
    email: "diego@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeNorteId,
    fecha_creacion: new Date("2024-04-14"),
    suscripcion: null,
    vehiculos: [
      { tipo: "furgoneta", marca: "Fiat", modelo: "Doblo", placa: "FGT781" },
      { tipo: "bicicleta", marca: "Scott", modelo: "Aspect", placa: null }
    ]
  },
  {
    nombre: "Sara Mejía",
    cedula: "1010000015",
    email: "sara@cliente.com",
    rol: "cliente",
    clave: null,
    sede_id: sedeCentroId,
    fecha_creacion: new Date("2024-04-15"),
    suscripcion: { tipo: "mensual" },
    vehiculos: [
      { tipo: "carro", marca: "Kia", modelo: "Picanto", placa: "FRH920" },
      { tipo: "vehiculoElectrico", marca: "Zhidou", modelo: "D2S", placa: "EVN442" },
      { tipo: "carro", marca: "Renault", modelo: "Stepway", placa: "TRZ310" }
    ]
  }
]);

// ==============================
// Insertar PARQUEOS
// ==============================

// ==============================
// Insertar PARQUEOS (50 registros, denormalización parcial)
// ==============================
db.parqueos.insertMany([
  {
    placa: "EVN442",
    tipo_vehiculo: "vehiculoElectrico",
    sede_id: sedeSurId,
    zona_id: zonaC3,
    hora_entrada: new Date("2025-07-06T14:08:00-05:00"),
    hora_salida: new Date("2025-07-06T16:14:00-05:00"),
    tiempo_total_min: 126,
    costo: 8820.0
  },
  {
    placa: "YUL763",
    tipo_vehiculo: "carro",
    sede_id: sedeSurId,
    zona_id: zonaC1,
    hora_entrada: new Date("2025-07-02T09:10:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "EQC124",
    tipo_vehiculo: "vehiculoElectrico",
    sede_id: sedeCentroId,
    zona_id: zonaB3,
    hora_entrada: new Date("2025-07-02T10:30:00-05:00"),
    hora_salida: new Date("2025-07-02T13:27:00-05:00"),
    tiempo_total_min: 177,
    costo: 7375.0
  },
  {
    placa: "BAJ82T",
    tipo_vehiculo: "moto",
    sede_id: sedeNorteId,
    zona_id: zonaA4,
    hora_entrada: new Date("2025-07-11T09:43:00-05:00"),
    hora_salida: new Date("2025-07-11T12:37:00-05:00"),
    tiempo_total_min: 174,
    costo: 4350.0
  },
  {
    placa: "CVP638",
    tipo_vehiculo: "carro",
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    hora_entrada: new Date("2025-07-03T16:27:00-05:00"),
    hora_salida: new Date("2025-07-03T17:40:00-05:00"),
    tiempo_total_min: 73,
    costo: 3041.67
  },
  {
    placa: "WFV378",
    tipo_vehiculo: "carro",
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    hora_entrada: new Date("2025-07-03T14:42:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "LPR134",
    tipo_vehiculo: "camion",
    sede_id: sedeSurId,
    zona_id: zonaC2,
    hora_entrada: new Date("2025-07-05T13:08:00-05:00"),
    hora_salida: new Date("2025-07-05T14:00:00-05:00"),
    tiempo_total_min: 52,
    costo: 4333.33
  },
  {
    placa: "BAJ82T",
    tipo_vehiculo: "moto",
    sede_id: sedeNorteId,
    zona_id: zonaA4,
    hora_entrada: new Date("2025-07-07T12:57:00-05:00"),
    hora_salida: new Date("2025-07-07T15:01:00-05:00"),
    tiempo_total_min: 124,
    costo: 3100.0
  },
  {
    placa: "HTR32M",
    tipo_vehiculo: "cuatrimoto",
    sede_id: sedeCentroId,
    zona_id: zonaB5,
    hora_entrada: new Date("2025-07-07T12:35:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "VXZ920",
    tipo_vehiculo: "bus",
    sede_id: sedeSurId,
    zona_id: zonaC3,
    hora_entrada: new Date("2025-07-09T12:36:00-05:00"),
    hora_salida: new Date("2025-07-09T13:21:00-05:00"),
    tiempo_total_min: 45,
    costo: 3150.0
  },
  {
    placa: "HTR32M",
    tipo_vehiculo: "cuatrimoto",
    sede_id: sedeCentroId,
    zona_id: zonaB5,
    hora_entrada: new Date("2025-07-10T07:29:00-05:00"),
    hora_salida: new Date("2025-07-10T09:19:00-05:00"),
    tiempo_total_min: 110,
    costo: 4583.33
  },
  {
    placa: "EQC124",
    tipo_vehiculo: "vehiculoElectrico",
    sede_id: sedeCentroId,
    zona_id: zonaB3,
    hora_entrada: new Date("2025-07-01T08:49:00-05:00"),
    hora_salida: new Date("2025-07-01T10:37:00-05:00"),
    tiempo_total_min: 108,
    costo: 4500.0
  },
  {
    placa: "QUA39G",
    tipo_vehiculo: "cuatrimoto",
    sede_id: sedeCentroId,
    zona_id: zonaB5,
    hora_entrada: new Date("2025-07-02T06:06:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "KYZ772",
    tipo_vehiculo: "camion",
    sede_id: sedeSurId,
    zona_id: zonaC2,
    hora_entrada: new Date("2025-07-05T10:40:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "RDF345",
    tipo_vehiculo: "carro",
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    hora_entrada: new Date("2025-07-10T10:33:00-05:00"),
    hora_salida: new Date("2025-07-10T13:32:00-05:00"),
    tiempo_total_min: 179,
    costo: 8950.0
  },
  {
    placa: "EVN442",
    tipo_vehiculo: "vehiculoElectrico",
    sede_id: sedeSurId,
    zona_id: zonaC3,
    hora_entrada: new Date("2025-07-01T10:43:00-05:00"),
    hora_salida: new Date("2025-07-01T12:58:00-05:00"),
    tiempo_total_min: 135,
    costo: 9450.0
  },
  {
    placa: "FRH920",
    tipo_vehiculo: "carro",
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    hora_entrada: new Date("2025-07-08T10:40:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "LPR134",
    tipo_vehiculo: "camion",
    sede_id: sedeSurId,
    zona_id: zonaC2,
    hora_entrada: new Date("2025-07-08T07:36:00-05:00"),
    hora_salida: new Date("2025-07-08T08:35:00-05:00"),
    tiempo_total_min: 59,
    costo: 4916.67
  },
  {
    placa: "CVP638",
    tipo_vehiculo: "carro",
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    hora_entrada: new Date("2025-07-08T09:09:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "JLU991",
    tipo_vehiculo: "carro",
    sede_id: sedeSurId,
    zona_id: zonaC1,
    hora_entrada: new Date("2025-07-06T09:39:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "AKT91C",
    tipo_vehiculo: "moto",
    sede_id: sedeCentroId,
    zona_id: zonaB4,
    hora_entrada: new Date("2025-07-05T15:37:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "TRZ310",
    tipo_vehiculo: "carro",
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    hora_entrada: new Date("2025-07-01T09:20:00-05:00"),
    hora_salida: new Date("2025-07-01T12:08:00-05:00"),
    tiempo_total_min: 168,
    costo: 7000.0
  },
  {
    placa: "LPR134",
    tipo_vehiculo: "camion",
    sede_id: sedeSurId,
    zona_id: zonaC2,
    hora_entrada: new Date("2025-07-07T17:39:00-05:00"),
    hora_salida: new Date("2025-07-07T20:19:00-05:00"),
    tiempo_total_min: 160,
    costo: 13333.33
  },
  {
    placa: "HTW823",
    tipo_vehiculo: "carro",
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    hora_entrada: new Date("2025-07-04T17:59:00-05:00"),
    hora_salida: new Date("2025-07-04T19:50:00-05:00"),
    tiempo_total_min: 111,
    costo: 4625.0
  },
  {
    placa: "TXU997",
    tipo_vehiculo: "camion",
    sede_id: sedeCentroId,
    zona_id: zonaB2,
    hora_entrada: new Date("2025-07-10T17:36:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "HTR32M",
    tipo_vehiculo: "cuatrimoto",
    sede_id: sedeCentroId,
    zona_id: zonaB5,
    hora_entrada: new Date("2025-07-09T13:29:00-05:00"),
    hora_salida: new Date("2025-07-09T15:30:00-05:00"),
    tiempo_total_min: 121,
    costo: 5041.67
  },
  {
    placa: "HTW823",
    tipo_vehiculo: "carro",
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    hora_entrada: new Date("2025-07-05T07:16:00-05:00"),
    hora_salida: new Date("2025-07-05T09:02:00-05:00"),
    tiempo_total_min: 106,
    costo: 4416.67
  },
  {
    placa: "VHN832",
    tipo_vehiculo: "vehiculoElectrico",
    sede_id: sedeCentroId,
    zona_id: zonaB3,
    hora_entrada: new Date("2025-07-11T15:38:00-05:00"),
    hora_salida: new Date("2025-07-11T17:12:00-05:00"),
    tiempo_total_min: 94,
    costo: 3916.67
  },
  {
    placa: "VHN832",
    tipo_vehiculo: "vehiculoElectrico",
    sede_id: sedeCentroId,
    zona_id: zonaB3,
    hora_entrada: new Date("2025-07-11T17:16:00-05:00"),
    hora_salida: new Date("2025-07-11T18:35:00-05:00"),
    tiempo_total_min: 79,
    costo: 3291.67
  },
  {
    placa: "KYZ772",
    tipo_vehiculo: "camion",
    sede_id: sedeSurId,
    zona_id: zonaC2,
    hora_entrada: new Date("2025-07-05T08:44:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "JLU991",
    tipo_vehiculo: "carro",
    sede_id: sedeSurId,
    zona_id: zonaC1,
    hora_entrada: new Date("2025-07-03T18:17:00-05:00"),
    hora_salida: new Date("2025-07-03T20:32:00-05:00"),
    tiempo_total_min: 135,
    costo: 4500.0
  },
  {
    placa: "KYZ772",
    tipo_vehiculo: "camion",
    sede_id: sedeSurId,
    zona_id: zonaC2,
    hora_entrada: new Date("2025-07-07T11:43:00-05:00"),
    hora_salida: new Date("2025-07-07T13:39:00-05:00"),
    tiempo_total_min: 116,
    costo: 9666.67
  },
  {
    placa: "VXZ920",
    tipo_vehiculo: "bus",
    sede_id: sedeSurId,
    zona_id: zonaC3,
    hora_entrada: new Date("2025-07-02T08:01:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "FGT781",
    tipo_vehiculo: "furgoneta",
    sede_id: sedeCentroId,
    zona_id: zonaB5,
    hora_entrada: new Date("2025-07-05T15:57:00-05:00"),
    hora_salida: new Date("2025-07-05T16:29:00-05:00"),
    tiempo_total_min: 32,
    costo: 1333.33
  },
  {
    placa: "SUZ63N",
    tipo_vehiculo: "moto",
    sede_id: sedeSurId,
    zona_id: zonaC4,
    hora_entrada: new Date("2025-07-10T08:33:00-05:00"),
    hora_salida: new Date("2025-07-10T09:32:00-05:00"),
    tiempo_total_min: 59,
    costo: 1475.0
  },
  {
    placa: "VXZ920",
    tipo_vehiculo: "bus",
    sede_id: sedeSurId,
    zona_id: zonaC3,
    hora_entrada: new Date("2025-07-07T17:38:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "SUZ63N",
    tipo_vehiculo: "moto",
    sede_id: sedeSurId,
    zona_id: zonaC4,
    hora_entrada: new Date("2025-07-10T10:38:00-05:00"),
    hora_salida: new Date("2025-07-10T13:20:00-05:00"),
    tiempo_total_min: 162,
    costo: 4050.0
  },
  {
    placa: "AKT91C",
    tipo_vehiculo: "moto",
    sede_id: sedeCentroId,
    zona_id: zonaB4,
    hora_entrada: new Date("2025-07-04T18:20:00-05:00"),
    hora_salida: new Date("2025-07-04T21:15:00-05:00"),
    tiempo_total_min: 175,
    costo: 5833.33
  },
  {
    placa: "BAJ82T",
    tipo_vehiculo: "moto",
    sede_id: sedeNorteId,
    zona_id: zonaA4,
    hora_entrada: new Date("2025-07-07T18:56:00-05:00"),
    hora_salida: new Date("2025-07-07T20:53:00-05:00"),
    tiempo_total_min: 117,
    costo: 2925.0
  },
  {
    placa: "QUA39G",
    tipo_vehiculo: "cuatrimoto",
    sede_id: sedeCentroId,
    zona_id: zonaB5,
    hora_entrada: new Date("2025-07-11T17:33:00-05:00"),
    hora_salida: new Date("2025-07-11T20:14:00-05:00"),
    tiempo_total_min: 161,
    costo: 6708.33
  },
  {
    placa: "RDF345",
    tipo_vehiculo: "carro",
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    hora_entrada: new Date("2025-07-11T15:47:00-05:00"),
    hora_salida: new Date("2025-07-11T16:45:00-05:00"),
    tiempo_total_min: 58,
    costo: 2900.0
  },
  {
    placa: "HTW823",
    tipo_vehiculo: "carro",
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    hora_entrada: new Date("2025-07-10T16:41:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "JLU991",
    tipo_vehiculo: "carro",
    sede_id: sedeSurId,
    zona_id: zonaC1,
    hora_entrada: new Date("2025-07-11T15:54:00-05:00"),
    hora_salida: new Date("2025-07-11T18:08:00-05:00"),
    tiempo_total_min: 134,
    costo: 4466.67
  },
  {
    placa: "PTV490",
    tipo_vehiculo: "furgoneta",
    sede_id: sedeSurId,
    zona_id: zonaC5,
    hora_entrada: new Date("2025-07-07T11:18:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "EQC124",
    tipo_vehiculo: "vehiculoElectrico",
    sede_id: sedeCentroId,
    zona_id: zonaB3,
    hora_entrada: new Date("2025-07-03T09:08:00-05:00"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    placa: "RDF345",
    tipo_vehiculo: "carro",
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    hora_entrada: new Date("2025-07-06T16:42:00-05:00"),
    hora_salida: new Date("2025-07-06T17:34:00-05:00"),
    tiempo_total_min: 52,
    costo: 2600.0
  },
  {
    placa: "AKT91C",
    tipo_vehiculo: "moto",
    sede_id: sedeCentroId,
    zona_id: zonaB4,
    hora_entrada: new Date("2025-07-04T09:17:00-05:00"),
    hora_salida: new Date("2025-07-04T11:48:00-05:00"),
    tiempo_total_min: 151,
    costo: 5033.33
  },
  {
    placa: "LPR134",
    tipo_vehiculo: "camion",
    sede_id: sedeSurId,
    zona_id: zonaC2,
    hora_entrada: new Date("2025-07-10T08:32:00-05:00"),
    hora_salida: new Date("2025-07-10T10:42:00-05:00"),
    tiempo_total_min: 130,
    costo: 10833.33
  },
  {
    placa: "FGT781",
    tipo_vehiculo: "furgoneta",
    sede_id: sedeCentroId,
    zona_id: zonaB5,
    hora_entrada: new Date("2025-07-02T13:56:00-05:00"),
    hora_salida: new Date("2025-07-02T15:13:00-05:00"),
    tiempo_total_min: 77,
    costo: 3208.33
  },
  {
    placa: "VXZ920",
    tipo_vehiculo: "bus",
    sede_id: sedeSurId,
    zona_id: zonaC3,
    hora_entrada: new Date("2025-07-06T09:57:00-05:00"),
    hora_salida: new Date("2025-07-06T12:38:00-05:00"),
    tiempo_total_min: 161,
    costo: 11270.0
  }
]);

