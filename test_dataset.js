// ==============================
// Insertar SEDES
// ==============================

let sedeNorteId = db.sedes.insertOne({
  nombre: "Sede Norte",
  direccion: "Cra. 45 #120-55",
  ciudad: "Bogotá",
  telefono: "3101112233"
}).insertedId;

let sedeCentroId = db.sedes.insertOne({
  nombre: "Sede Centro",
  direccion: "Cl. 10 #35-20",
  ciudad: "Medellín",
  telefono: "3152469587"
}).insertedId;

let sedeSurId = db.sedes.insertOne({
  nombre: "Sede Sur",
  direccion: "Av. Malpaso #80-15",
  ciudad: "Cali",
  telefono: "3153809684"
}).insertedId;

// ==============================
// Insertar ZONAS
// ==============================

let zonaA1 = db.zonas.insertOne({
  nombre: "Zona A1",
  sede_id: sedeNorteId,
  tipos_vehiculo: ["carro"],
  capacidad: 10,
  cupos_disponibles: 10,
  tarifa_hora: 2500
}).insertedId;

let zonaA2 = db.zonas.insertOne({
  nombre: "Zona A2",
  sede_id: sedeNorteId,
  tipos_vehiculo: ["camion"],
  capacidad: 5,
  cupos_disponibles: 5,
  tarifa_hora: 5500
}).insertedId;

let zonaA3 = db.zonas.insertOne({
  nombre: "Zona A3",
  sede_id: sedeNorteId,
  tipos_vehiculo: ["bicicleta"],
  capacidad: 8,
  cupos_disponibles: 8,
  tarifa_hora: 1000
}).insertedId;

let zonaA4 = db.zonas.insertOne({
  nombre: "Zona A4",
  sede_id: sedeNorteId,
  tipos_vehiculo: ["moto"],
  capacidad: 20,
  cupos_disponibles: 20,
  tarifa_hora: 1500
}).insertedId;

let zonaA5 = db.zonas.insertOne({
  nombre: "Zona A5",
  sede_id: sedeNorteId,
  tipos_vehiculo: ["cuatrimoto"],
  capacidad: 10,
  cupos_disponibles: 10,
  tarifa_hora: 2000
}).insertedId;

let zonaB1 = db.zonas.insertOne({
  nombre: "Zona B1",
  sede_id: sedeCentroId,
  tipos_vehiculo: ["carro"],
  capacidad: 10,
  cupos_disponibles: 10,
  tarifa_hora: 3000
}).insertedId;

let zonaB2 = db.zonas.insertOne({
  nombre: "Zona B2",
  sede_id: sedeCentroId,
  tipos_vehiculo: ["camion"],
  capacidad: 5,
  cupos_disponibles: 5,
  tarifa_hora: 6000
}).insertedId;

let zonaB3 = db.zonas.insertOne({
  nombre: "Zona B3",
  sede_id: sedeCentroId,
  tipos_vehiculo: ["vehiculoElectrico"],
  capacidad: 8,
  cupos_disponibles: 8,
  tarifa_hora: 2500
}).insertedId;

let zonaB4 = db.zonas.insertOne({
  nombre: "Zona B4",
  sede_id: sedeCentroId,
  tipos_vehiculo: ["moto"],
  capacidad: 20,
  cupos_disponibles: 20,
  tarifa_hora: 2000
}).insertedId;

let zonaB5 = db.zonas.insertOne({
  nombre: "Zona B5",
  sede_id: sedeCentroId,
  tipos_vehiculo: ["cuatrimoto"],
  capacidad: 10,
  cupos_disponibles: 10,
  tarifa_hora: 2500
}).insertedId;

let zonaC1 = db.zonas.insertOne({
  nombre: "Zona C1",
  sede_id: sedeSurId,
  tipos_vehiculo: ["carro"],
  capacidad: 20,
  cupos_disponibles: 20,
  tarifa_hora: 2000
}).insertedId;

let zonaC2 = db.zonas.insertOne({
  nombre: "Zona C2",
  sede_id: sedeSurId,
  tipos_vehiculo: ["camion"],
  capacidad: 25,
  cupos_disponibles: 25,
  tarifa_hora: 5000
}).insertedId;

let zonaC3 = db.zonas.insertOne({
  nombre: "Zona C3",
  sede_id: sedeSurId,
  tipos_vehiculo: ["bus"],
  capacidad: 20,
  cupos_disponibles: 20,
  tarifa_hora: 4000
}).insertedId;

let zonaC4 = db.zonas.insertOne({
  nombre: "Zona C4",
  sede_id: sedeSurId,
  tipos_vehiculo: ["moto"],
  capacidad: 20,
  cupos_disponibles: 20,
  tarifa_hora: 1500
}).insertedId;

let zonaC5 = db.zonas.insertOne({
  nombre: "Zona C5",
  sede_id: sedeSurId,
  tipos_vehiculo: ["furgoneta"],
  capacidad: 15,
  cupos_disponibles: 15,
  tarifa_hora: 2500
}).insertedId;


// ==============================
// Insertar USUARIOS
// ==============================

let adminNorteId = db.usuarios.insertOne({
  nombre: "Carlos Ríos",
  cedula: "1001234567",
  email: "carlos.rios@norte.com",
  rol: "administrador",
  clave: "admin123",
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-01-01"),
  suscripcion: null
}).insertedId;

let adminCentroId = db.usuarios.insertOne({
  nombre: "María Gómez",
  cedula: "1002234567",
  email: "maria.gomez@centro.com",
  rol: "administrador",
  clave: "admin123",
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-01-02"),
  suscripcion: null
}).insertedId;

let adminSurId = db.usuarios.insertOne({
  nombre: "Julián Torres",
  cedula: "1003234567",
  email: "julian.torres@sur.com",
  rol: "administrador",
  clave: "admin123",
  sede_id: sedeSurId,
  fecha_creacion: new Date("2024-01-03"),
  suscripcion: null
}).insertedId;

// 10 EMPLEADOS (distribuidos entre sedes)

let empleado1 = db.usuarios.insertOne({
  nombre: "Andrea Martínez",
  cedula: "1004000001",
  email: "andrea@norte.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-03-01"),
  suscripcion: null
}).insertedId;

let empleado2 = db.usuarios.insertOne({
  nombre: "Luis Ramírez",
  cedula: "1004000002",
  email: "luis@norte.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-03-05"),
  suscripcion: null
}).insertedId;

let empleado3 = db.usuarios.insertOne({
  nombre: "Daniela Pérez",
  cedula: "1004000003",
  email: "daniela@centro.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-03-07"),
  suscripcion: null
}).insertedId;

let empleado4 = db.usuarios.insertOne({
  nombre: "Juan Herrera",
  cedula: "1004000004",
  email: "juan@centro.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-03-09"),
  suscripcion: null
}).insertedId;

let empleado5 = db.usuarios.insertOne({
  nombre: "Laura Mendoza",
  cedula: "1004000005",
  email: "laura@centro.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-03-10"),
  suscripcion: null
}).insertedId;

let empleado6 = db.usuarios.insertOne({
  nombre: "Santiago Ruiz",
  cedula: "1004000006",
  email: "santiago@sur.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeSurId,
  fecha_creacion: new Date("2024-03-15"),
  suscripcion: null
}).insertedId;

let empleado7 = db.usuarios.insertOne({
  nombre: "Valentina López",
  cedula: "1004000007",
  email: "valentina@sur.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeSurId,
  fecha_creacion: new Date("2024-03-18"),
  suscripcion: null
}).insertedId;

let empleado8 = db.usuarios.insertOne({
  nombre: "David Gómez",
  cedula: "1004000008",
  email: "david@sur.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeSurId,
  fecha_creacion: new Date("2024-03-20"),
  suscripcion: null
}).insertedId;

let empleado9 = db.usuarios.insertOne({
  nombre: "Tatiana Acosta",
  cedula: "1004000009",
  email: "tatiana@norte.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-03-25"),
  suscripcion: null
}).insertedId;

let empleado10 = db.usuarios.insertOne({
  nombre: "Felipe Salazar",
  cedula: "1004000010",
  email: "felipe@norte.com",
  rol: "empleado",
  clave: "empleado123",
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-03-28"),
  suscripcion: null
}).insertedId;


// 15 CLIENTES (algunos con suscripción, otros no)
let cliente1Id = db.usuarios.insertOne({
  nombre: "Ana Torres",
  cedula: "1010000001",
  email: "ana@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-04-01"),
  suscripcion: { tipo: "mensual" }
}).insertedId;

let cliente2Id = db.usuarios.insertOne({
  nombre: "Jorge Peña",
  cedula: "1010000002",
  email: "jorge@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-04-02"),
  suscripcion: { tipo: "diario" }
}).insertedId;

let cliente3Id = db.usuarios.insertOne({
  nombre: "Camila Silva",
  cedula: "1010000003",
  email: "camila@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-04-03"),
  suscripcion: { tipo: "anual" }
}).insertedId;

let cliente4Id = db.usuarios.insertOne({
  nombre: "Andrés Molina",
  cedula: "1010000004",
  email: "andres@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeSurId,
  fecha_creacion: new Date("2024-04-04"),
  suscripcion: null
}).insertedId;

let cliente5Id = db.usuarios.insertOne({
  nombre: "Karen Díaz",
  cedula: "1010000005",
  email: "karen@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-04-05"),
  suscripcion: { tipo: "trimestral" }
}).insertedId;

let cliente6Id = db.usuarios.insertOne({
  nombre: "Esteban Rico",
  cedula: "1010000006",
  email: "esteban@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeSurId,
  fecha_creacion: new Date("2024-04-06"),
  suscripcion: { tipo: "mensual" }
}).insertedId;

let cliente7Id = db.usuarios.insertOne({
  nombre: "Natalia Garzón",
  cedula: "1010000007",
  email: "natalia@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-04-07"),
  suscripcion: null
}).insertedId;

let cliente8Id = db.usuarios.insertOne({
  nombre: "Pedro Barrios",
  cedula: "1010000008",
  email: "pedro@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-04-08"),
  suscripcion: { tipo: "semestral" }
}).insertedId;

let cliente9Id = db.usuarios.insertOne({
  nombre: "Melissa Rojas",
  cedula: "1010000009",
  email: "melissa@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-04-09"),
  suscripcion: null
}).insertedId;

let cliente10Id = db.usuarios.insertOne({
  nombre: "Carlos Mendoza",
  cedula: "1010000010",
  email: "carlos@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeSurId,
  fecha_creacion: new Date("2024-04-10"),
  suscripcion: null
}).insertedId;

let cliente11Id = db.usuarios.insertOne({
  nombre: "Lucía Páez",
  cedula: "1010000011",
  email: "lucia@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-04-11"),
  suscripcion: { tipo: "anual" }
}).insertedId;

let cliente12Id = db.usuarios.insertOne({
  nombre: "Mario Cortés",
  cedula: "1010000012",
  email: "mario@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-04-12"),
  suscripcion: { tipo: "mensual" }
}).insertedId;

let cliente13Id = db.usuarios.insertOne({
  nombre: "Laura Niño",
  cedula: "1010000013",
  email: "laura@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeSurId,
  fecha_creacion: new Date("2024-04-13"),
  suscripcion: { tipo: "semanal" }
}).insertedId;

let cliente14Id = db.usuarios.insertOne({
  nombre: "Diego Suárez",
  cedula: "1010000014",
  email: "diego@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeNorteId,
  fecha_creacion: new Date("2024-04-14"),
  suscripcion: null
}).insertedId;

let cliente15Id = db.usuarios.insertOne({
  nombre: "Sara Mejía",
  cedula: "1010000015",
  email: "sara@cliente.com",
  rol: "cliente",
  clave: null,
  sede_id: sedeCentroId,
  fecha_creacion: new Date("2024-04-15"),
  suscripcion: { tipo: "mensual" }
}).insertedId;

// ==============================
// Insertar VEHICULOS
// ==============================


let vehiculo1 = db.vehiculos.insertOne({
  tipo: "camion",
  marca: "Hino",
  modelo: "300",
  usuario_id: cliente1Id,
  placa: "TXU997"
}).insertedId;

let vehiculo2 = db.vehiculos.insertOne({
  tipo: "bicicleta",
  marca: "Trek",
  modelo: "Marlin",
  usuario_id: cliente2Id,
  placa: null
}).insertedId;

let vehiculo3 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Toyota",
  modelo: "Corolla",
  usuario_id: cliente3Id,
  placa: "WFV378"
}).insertedId;

let vehiculo4 = db.vehiculos.insertOne({
  tipo: "bus",
  marca: "Volkswagen",
  modelo: "9-150",
  usuario_id: cliente4Id,
  placa: "XHU161"
}).insertedId;

let vehiculo5 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Toyota",
  modelo: "Corolla",
  usuario_id: cliente5Id,
  placa: "WZQ423"
}).insertedId;

let vehiculo6 = db.vehiculos.insertOne({
  tipo: "moto",
  marca: "Yamaha",
  modelo: "FZ 2.0",
  usuario_id: cliente1Id,
  placa: "YMC21F"
}).insertedId;

let vehiculo7 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Mazda",
  modelo: "3",
  usuario_id: cliente2Id,
  placa: "RDF345"
}).insertedId;

let vehiculo8 = db.vehiculos.insertOne({
  tipo: "vehiculoElectrico",
  marca: "Tesla",
  modelo: "Model 3",
  usuario_id: cliente3Id,
  placa: "VHN832"
}).insertedId;

let vehiculo9 = db.vehiculos.insertOne({
  tipo: "cuatrimoto",
  marca: "Can-Am",
  modelo: "Outlander",
  usuario_id: cliente4Id,
  placa: "HTR32M"
}).insertedId;

let vehiculo10 = db.vehiculos.insertOne({
  tipo: "bicicleta",
  marca: "Specialized",
  modelo: "Rockhopper",
  usuario_id: cliente5Id,
  placa: null
}).insertedId;

let vehiculo11 = db.vehiculos.insertOne({
  tipo: "camion",
  marca: "Chevrolet",
  modelo: "NHR",
  usuario_id: cliente6Id,
  placa: "LPR134"
}).insertedId;

let vehiculo12 = db.vehiculos.insertOne({
  tipo: "furgoneta",
  marca: "Renault",
  modelo: "Kangoo",
  usuario_id: cliente6Id,
  placa: "PTV490"
}).insertedId;

let vehiculo13 = db.vehiculos.insertOne({
  tipo: "moto",
  marca: "AKT",
  modelo: "NKD 125",
  usuario_id: cliente7Id,
  placa: "AKT91C"
}).insertedId;

let vehiculo14 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Kia",
  modelo: "Picanto",
  usuario_id: cliente7Id,
  placa: "FRH920"
}).insertedId;

let vehiculo15 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Chevrolet",
  modelo: "Sail",
  usuario_id: cliente8Id,
  placa: "YUL763"
}).insertedId;

let vehiculo16 = db.vehiculos.insertOne({
  tipo: "vehiculoElectrico",
  marca: "BYD",
  modelo: "Dolphin",
  usuario_id: cliente8Id,
  placa: "EQC124"
}).insertedId;

let vehiculo17 = db.vehiculos.insertOne({
  tipo: "bicicleta",
  marca: "Giant",
  modelo: "Talon 3",
  usuario_id: cliente9Id,
  placa: null
}).insertedId;

let vehiculo18 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Hyundai",
  modelo: "i20",
  usuario_id: cliente9Id,
  placa: "HTW823"
}).insertedId;

let vehiculo19 = db.vehiculos.insertOne({
  tipo: "moto",
  marca: "Suzuki",
  modelo: "Gixxer",
  usuario_id: cliente10Id,
  placa: "SUZ63N"
}).insertedId;

let vehiculo20 = db.vehiculos.insertOne({
  tipo: "camion",
  marca: "Dongfeng",
  modelo: "DFL3251A",
  usuario_id: cliente10Id,
  placa: "KYZ772"
}).insertedId;

let vehiculo21 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Nissan",
  modelo: "Versa",
  usuario_id: cliente11Id,
  placa: "CVP638"
}).insertedId;

let vehiculo22 = db.vehiculos.insertOne({
  tipo: "bus",
  marca: "Mercedes-Benz",
  modelo: "O500",
  usuario_id: cliente11Id,
  placa: "VXZ920"
}).insertedId;

let vehiculo23 = db.vehiculos.insertOne({
  tipo: "cuatrimoto",
  marca: "Yamaha",
  modelo: "Raptor 700",
  usuario_id: cliente12Id,
  placa: "QUA39G"
}).insertedId;

let vehiculo24 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Ford",
  modelo: "Focus",
  usuario_id: cliente12Id,
  placa: "PQR271"
}).insertedId;

let vehiculo25 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Peugeot",
  modelo: "208",
  usuario_id: cliente13Id,
  placa: "JLU991"
}).insertedId;

let vehiculo26 = db.vehiculos.insertOne({
  tipo: "moto",
  marca: "Bajaj",
  modelo: "Pulsar",
  usuario_id: cliente13Id,
  placa: "BAJ82T"
}).insertedId;

let vehiculo27 = db.vehiculos.insertOne({
  tipo: "furgoneta",
  marca: "Fiat",
  modelo: "Doblo",
  usuario_id: cliente14Id,
  placa: "FGT781"
}).insertedId;

let vehiculo28 = db.vehiculos.insertOne({
  tipo: "bicicleta",
  marca: "Scott",
  modelo: "Aspect",
  usuario_id: cliente14Id,
  placa: null
}).insertedId;

let vehiculo29 = db.vehiculos.insertOne({
  tipo: "vehiculoElectrico",
  marca: "Zhidou",
  modelo: "D2S",
  usuario_id: cliente15Id,
  placa: "EVN442"
}).insertedId;

let vehiculo30 = db.vehiculos.insertOne({
  tipo: "carro",
  marca: "Renault",
  modelo: "Stepway",
  usuario_id: cliente15Id,
  placa: "TRZ310"
}).insertedId;

// ==============================
// Insertar PARQUEOS
// ==============================

db.parqueos.insertMany([
  {
    vehiculo_id: vehiculo1,
    sede_id: sedeNorteId,
    zona_id: zonaA2,
    fecha_ingreso: new Date("2025-06-10T07:15:00Z"),
    hora_entrada: new Date("2025-06-10T07:15:00Z"),
    hora_salida: new Date("2025-06-10T09:45:00Z"),
    tiempo_total_min: 150,
    costo: 13750.0
  },
  {
    vehiculo_id: vehiculo2,
    sede_id: sedeNorteId,
    zona_id: zonaA3,
    fecha_ingreso: new Date("2025-06-11T09:00:00Z"),
    hora_entrada: new Date("2025-06-11T09:00:00Z"),
    hora_salida: new Date("2025-06-11T09:45:00Z"),
    tiempo_total_min: 45,
    costo: 750.0
  },
  {
    vehiculo_id: vehiculo3,
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    fecha_ingreso: new Date("2025-06-10T08:00:00Z"),
    hora_entrada: new Date("2025-06-10T08:00:00Z"),
    hora_salida: new Date("2025-06-10T10:00:00Z"),
    tiempo_total_min: 120,
    costo: 6000.0
  },
  {
    vehiculo_id: vehiculo4,
    sede_id: sedeSurId,
    zona_id: zonaC3,
    fecha_ingreso: new Date("2025-06-12T07:30:00Z"),
    hora_entrada: new Date("2025-06-12T07:30:00Z"),
    hora_salida: new Date("2025-06-12T08:30:00Z"),
    tiempo_total_min: 60,
    costo: 4000.0
  },
  {
    vehiculo_id: vehiculo5,
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    fecha_ingreso: new Date("2025-06-12T10:00:00Z"),
    hora_entrada: new Date("2025-06-12T10:00:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo6,
    sede_id: sedeNorteId,
    zona_id: zonaA4,
    fecha_ingreso: new Date("2025-06-13T11:00:00Z"),
    hora_entrada: new Date("2025-06-13T11:00:00Z"),
    hora_salida: new Date("2025-06-13T12:15:00Z"),
    tiempo_total_min: 75,
    costo: 1875.0
  },
  {
    vehiculo_id: vehiculo7,
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    fecha_ingreso: new Date("2025-06-13T14:00:00Z"),
    hora_entrada: new Date("2025-06-13T14:00:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo8,
    sede_id: sedeCentroId,
    zona_id: zonaB3,
    fecha_ingreso: new Date("2025-06-13T08:45:00Z"),
    hora_entrada: new Date("2025-06-13T08:45:00Z"),
    hora_salida: new Date("2025-06-13T09:45:00Z"),
    tiempo_total_min: 60,
    costo: 2500.0
  },
  {
    vehiculo_id: vehiculo9,
    sede_id: sedeCentroId,
    zona_id: zonaB5,
    fecha_ingreso: new Date("2025-06-14T10:00:00Z"),
    hora_entrada: new Date("2025-06-14T10:00:00Z"),
    hora_salida: new Date("2025-06-14T11:30:00Z"),
    tiempo_total_min: 90,
    costo: 3750.0
  },
  {
    vehiculo_id: vehiculo10,
    sede_id: sedeNorteId,
    zona_id: zonaA3,
    fecha_ingreso: new Date("2025-06-14T07:30:00Z"),
    hora_entrada: new Date("2025-06-14T07:30:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
    {
    vehiculo_id: vehiculo11,
    sede_id: sedeSurId,
    zona_id: zonaC2,
    fecha_ingreso: new Date("2025-06-14T12:00:00Z"),
    hora_entrada: new Date("2025-06-14T12:00:00Z"),
    hora_salida: new Date("2025-06-14T13:30:00Z"),
    tiempo_total_min: 90,
    costo: 7750.0
  },
  {
    vehiculo_id: vehiculo12,
    sede_id: sedeSurId,
    zona_id: zonaC5,
    fecha_ingreso: new Date("2025-06-15T09:00:00Z"),
    hora_entrada: new Date("2025-06-15T09:00:00Z"),
    hora_salida: new Date("2025-06-15T10:15:00Z"),
    tiempo_total_min: 75,
    costo: 2800.0
  },
  {
    vehiculo_id: vehiculo13,
    sede_id: sedeCentroId,
    zona_id: zonaB4,
    fecha_ingreso: new Date("2025-06-15T11:30:00Z"),
    hora_entrada: new Date("2025-06-15T11:30:00Z"),
    hora_salida: new Date("2025-06-15T12:00:00Z"),
    tiempo_total_min: 30,
    costo: 1000.0
  },
  {
    vehiculo_id: vehiculo14,
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    fecha_ingreso: new Date("2025-06-15T14:00:00Z"),
    hora_entrada: new Date("2025-06-15T14:00:00Z"),
    hora_salida: new Date("2025-06-15T15:00:00Z"),
    tiempo_total_min: 60,
    costo: 3000.0
  },
  {
    vehiculo_id: vehiculo15,
    sede_id: sedeSurId,
    zona_id: zonaC1,
    fecha_ingreso: new Date("2025-06-16T08:00:00Z"),
    hora_entrada: new Date("2025-06-16T08:00:00Z"),
    hora_salida: new Date("2025-06-16T09:30:00Z"),
    tiempo_total_min: 90,
    costo: 3000.0
  },
  {
    vehiculo_id: vehiculo16,
    sede_id: sedeCentroId,
    zona_id: zonaB3,
    fecha_ingreso: new Date("2025-06-16T10:30:00Z"),
    hora_entrada: new Date("2025-06-16T10:30:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo17,
    sede_id: sedeNorteId,
    zona_id: zonaA3,
    fecha_ingreso: new Date("2025-06-16T11:00:00Z"),
    hora_entrada: new Date("2025-06-16T11:00:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo18,
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    fecha_ingreso: new Date("2025-06-16T11:15:00Z"),
    hora_entrada: new Date("2025-06-16T11:15:00Z"),
    hora_salida: new Date("2025-06-16T12:45:00Z"),
    tiempo_total_min: 90,
    costo: 4500.0
  },
  {
    vehiculo_id: vehiculo19,
    sede_id: sedeCentroId,
    zona_id: zonaB4,
    fecha_ingreso: new Date("2025-06-16T13:00:00Z"),
    hora_entrada: new Date("2025-06-16T13:00:00Z"),
    hora_salida: new Date("2025-06-16T14:00:00Z"),
    tiempo_total_min: 60,
    costo: 1500.0
  },
  {
    vehiculo_id: vehiculo20,
    sede_id: sedeSurId,
    zona_id: zonaC2,
    fecha_ingreso: new Date("2025-06-17T08:30:00Z"),
    hora_entrada: new Date("2025-06-17T08:30:00Z"),
    hora_salida: new Date("2025-06-17T10:30:00Z"),
    tiempo_total_min: 120,
    costo: 10000.0
  },
  {
    vehiculo_id: vehiculo21,
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    fecha_ingreso: new Date("2025-06-17T09:15:00Z"),
    hora_entrada: new Date("2025-06-17T09:15:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo22,
    sede_id: sedeCentroId,
    zona_id: zonaC3,
    fecha_ingreso: new Date("2025-06-17T10:45:00Z"),
    hora_entrada: new Date("2025-06-17T10:45:00Z"),
    hora_salida: new Date("2025-06-17T12:00:00Z"),
    tiempo_total_min: 75,
    costo: 5250.0
  },
  {
    vehiculo_id: vehiculo23,
    sede_id: sedeSurId,
    zona_id: zonaB5,
    fecha_ingreso: new Date("2025-06-17T13:00:00Z"),
    hora_entrada: new Date("2025-06-17T13:00:00Z"),
    hora_salida: new Date("2025-06-17T13:45:00Z"),
    tiempo_total_min: 45,
    costo: 1875.0
  },
  {
    vehiculo_id: vehiculo24,
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    fecha_ingreso: new Date("2025-06-17T14:30:00Z"),
    hora_entrada: new Date("2025-06-17T14:30:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo25,
    sede_id: sedeSurId,
    zona_id: zonaC1,
    fecha_ingreso: new Date("2025-06-17T15:00:00Z"),
    hora_entrada: new Date("2025-06-17T15:00:00Z"),
    hora_salida: new Date("2025-06-17T16:30:00Z"),
    tiempo_total_min: 90,
    costo: 4500.0
  },
  {
    vehiculo_id: vehiculo26,
    sede_id: sedeNorteId,
    zona_id: zonaA4,
    fecha_ingreso: new Date("2025-06-18T08:00:00Z"),
    hora_entrada: new Date("2025-06-18T08:00:00Z"),
    hora_salida: new Date("2025-06-18T09:00:00Z"),
    tiempo_total_min: 60,
    costo: 1500.0
  },
  {
    vehiculo_id: vehiculo27,
    sede_id: sedeCentroId,
    zona_id: zonaC5,
    fecha_ingreso: new Date("2025-06-18T09:15:00Z"),
    hora_entrada: new Date("2025-06-18T09:15:00Z"),
    hora_salida: new Date("2025-06-18T10:30:00Z"),
    tiempo_total_min: 75,
    costo: 3375.0
  },
  {
    vehiculo_id: vehiculo28,
    sede_id: sedeCentroId,
    zona_id: zonaA3,
    fecha_ingreso: new Date("2025-06-18T10:45:00Z"),
    hora_entrada: new Date("2025-06-18T10:45:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo29,
    sede_id: sedeSurId,
    zona_id: zonaB3,
    fecha_ingreso: new Date("2025-06-18T12:00:00Z"),
    hora_entrada: new Date("2025-06-18T12:00:00Z"),
    hora_salida: new Date("2025-06-18T13:30:00Z"),
    tiempo_total_min: 90,
    costo: 3750.0
  },
  {
    vehiculo_id: vehiculo30,
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    fecha_ingreso: new Date("2025-06-18T14:00:00Z"),
    hora_entrada: new Date("2025-06-18T14:00:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
    {
    vehiculo_id: vehiculo1,
    sede_id: sedeSurId,
    zona_id: zonaC2,
    fecha_ingreso: new Date("2025-06-19T08:00:00Z"),
    hora_entrada: new Date("2025-06-19T08:00:00Z"),
    hora_salida: new Date("2025-06-19T09:30:00Z"),
    tiempo_total_min: 90,
    costo: 4500.0
  },
  {
    vehiculo_id: vehiculo2,
    sede_id: sedeCentroId,
    zona_id: zonaA3,
    fecha_ingreso: new Date("2025-06-19T09:45:00Z"),
    hora_entrada: new Date("2025-06-19T09:45:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo3,
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    fecha_ingreso: new Date("2025-06-19T10:30:00Z"),
    hora_entrada: new Date("2025-06-19T10:30:00Z"),
    hora_salida: new Date("2025-06-19T12:00:00Z"),
    tiempo_total_min: 90,
    costo: 4500.0
  },
  {
    vehiculo_id: vehiculo4,
    sede_id: sedeCentroId,
    zona_id: zonaC3,
    fecha_ingreso: new Date("2025-06-19T13:00:00Z"),
    hora_entrada: new Date("2025-06-19T13:00:00Z"),
    hora_salida: new Date("2025-06-19T14:30:00Z"),
    tiempo_total_min: 90,
    costo: 6300.0
  },
  {
    vehiculo_id: vehiculo5,
    sede_id: sedeSurId,
    zona_id: zonaC1,
    fecha_ingreso: new Date("2025-06-19T15:00:00Z"),
    hora_entrada: new Date("2025-06-19T15:00:00Z"),
    hora_salida: new Date("2025-06-19T15:45:00Z"),
    tiempo_total_min: 45,
    costo: 2250.0
  },
  {
    vehiculo_id: vehiculo6,
    sede_id: sedeNorteId,
    zona_id: zonaA4,
    fecha_ingreso: new Date("2025-06-20T08:30:00Z"),
    hora_entrada: new Date("2025-06-20T08:30:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo7,
    sede_id: sedeNorteId,
    zona_id: zonaA1,
    fecha_ingreso: new Date("2025-06-20T09:00:00Z"),
    hora_entrada: new Date("2025-06-20T09:00:00Z"),
    hora_salida: new Date("2025-06-20T10:00:00Z"),
    tiempo_total_min: 60,
    costo: 3000.0
  },
  {
    vehiculo_id: vehiculo8,
    sede_id: sedeCentroId,
    zona_id: zonaB3,
    fecha_ingreso: new Date("2025-06-20T10:30:00Z"),
    hora_entrada: new Date("2025-06-20T10:30:00Z"),
    hora_salida: new Date("2025-06-20T11:45:00Z"),
    tiempo_total_min: 75,
    costo: 3750.0
  },
  {
    vehiculo_id: vehiculo9,
    sede_id: sedeSurId,
    zona_id: zonaB5,
    fecha_ingreso: new Date("2025-06-20T12:00:00Z"),
    hora_entrada: new Date("2025-06-20T12:00:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo10,
    sede_id: sedeCentroId,
    zona_id: zonaA3,
    fecha_ingreso: new Date("2025-06-20T13:15:00Z"),
    hora_entrada: new Date("2025-06-20T13:15:00Z"),
    hora_salida: new Date("2025-06-20T13:45:00Z"),
    tiempo_total_min: 30,
    costo: 750.0
  },
  {
    vehiculo_id: vehiculo11,
    sede_id: sedeSurId,
    zona_id: zonaC2,
    fecha_ingreso: new Date("2025-06-20T14:00:00Z"),
    hora_entrada: new Date("2025-06-20T14:00:00Z"),
    hora_salida: new Date("2025-06-20T15:45:00Z"),
    tiempo_total_min: 105,
    costo: 9025.0
  },
  {
    vehiculo_id: vehiculo12,
    sede_id: sedeNorteId,
    zona_id: zonaC5,
    fecha_ingreso: new Date("2025-06-21T08:00:00Z"),
    hora_entrada: new Date("2025-06-21T08:00:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo13,
    sede_id: sedeCentroId,
    zona_id: zonaB4,
    fecha_ingreso: new Date("2025-06-21T09:30:00Z"),
    hora_entrada: new Date("2025-06-21T09:30:00Z"),
    hora_salida: new Date("2025-06-21T10:15:00Z"),
    tiempo_total_min: 45,
    costo: 1125.0
  },
  {
    vehiculo_id: vehiculo14,
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    fecha_ingreso: new Date("2025-06-21T10:30:00Z"),
    hora_entrada: new Date("2025-06-21T10:30:00Z"),
    hora_salida: new Date("2025-06-21T11:45:00Z"),
    tiempo_total_min: 75,
    costo: 3750.0
  },
  {
    vehiculo_id: vehiculo15,
    sede_id: sedeSurId,
    zona_id: zonaC1,
    fecha_ingreso: new Date("2025-06-21T12:00:00Z"),
    hora_entrada: new Date("2025-06-21T12:00:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo16,
    sede_id: sedeSurId,
    zona_id: zonaB3,
    fecha_ingreso: new Date("2025-06-21T13:15:00Z"),
    hora_entrada: new Date("2025-06-21T13:15:00Z"),
    hora_salida: new Date("2025-06-21T14:15:00Z"),
    tiempo_total_min: 60,
    costo: 2500.0
  },
  {
    vehiculo_id: vehiculo17,
    sede_id: sedeNorteId,
    zona_id: zonaA3,
    fecha_ingreso: new Date("2025-06-21T14:30:00Z"),
    hora_entrada: new Date("2025-06-21T14:30:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo18,
    sede_id: sedeCentroId,
    zona_id: zonaB1,
    fecha_ingreso: new Date("2025-06-22T08:00:00Z"),
    hora_entrada: new Date("2025-06-22T08:00:00Z"),
    hora_salida: new Date("2025-06-22T09:30:00Z"),
    tiempo_total_min: 90,
    costo: 4500.0
  },
  {
    vehiculo_id: vehiculo19,
    sede_id: sedeSurId,
    zona_id: zonaC4,
    fecha_ingreso: new Date("2025-06-22T10:00:00Z"),
    hora_entrada: new Date("2025-06-22T10:00:00Z"),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  },
  {
    vehiculo_id: vehiculo20,
    sede_id: sedeNorteId,
    zona_id: zonaA2,
    fecha_ingreso: new Date("2025-06-22T11:00:00Z"),
    hora_entrada: new Date("2025-06-22T11:00:00Z"),
    hora_salida: new Date("2025-06-22T12:30:00Z"),
    tiempo_total_min: 90,
    costo: 7750
  }
]);
