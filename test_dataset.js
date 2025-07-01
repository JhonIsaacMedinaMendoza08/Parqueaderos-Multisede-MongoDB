// 1. Insertar las sedes y guardar sus _id en variables
let sedeNorteId = db.sedes.insertOne({
  nombre: "Sede Norte",
  direccion: "Cra. 45 #120-55",
  ciudad: "Bogotá",
  telefono: "+573101112233"
}).insertedId;

let sedeCentroId = db.sedes.insertOne({
  nombre: "Sede Centro",
  direccion: "Cl. 10 #35-20",
  ciudad: "Medellín",
  telefono: "+573022469587"
}).insertedId;

let sedeSurId = db.sedes.insertOne({
  nombre: "Sede Sur",
  direccion: "Av. Malpaso #80-15",
  ciudad: "Cali",
  telefono: "+573153809684"
}).insertedId;

// 2. Insertar zonas con referencia a cada sede
db.zonas.insertMany([
  {
    nombre: "Zona A1",
    sede_id: sedeNorteId,
    tipos_vehiculo: "carro",
    capacidad: 10,
    cupos_disponibles: 8,
    tarifa_hora: 2500
  },
  {
    nombre: "Zona A2",
    sede_id: sedeNorteId,
    tipos_vehiculo: "camion",
    capacidad: 5,
    cupos_disponibles: 3,
    tarifa_hora: 5500
  },
  {
    nombre: "Zona A3",
    sede_id: sedeNorteId,
    tipos_vehiculo: "bicicleta",
    capacidad: 8,
    cupos_disponibles: 7,
    tarifa_hora: 1000
  },
  {
    nombre: "Zona A4",
    sede_id: sedeNorteId,
    tipos_vehiculo: "moto",
    capacidad: 20,
    cupos_disponibles: 10,
    tarifa_hora: 1500
  },
  {
    nombre: "Zona A5",
    sede_id: sedeNorteId,
    tipos_vehiculo: "cuatrimoto",
    capacidad: 10,
    cupos_disponibles: 8,
    tarifa_hora: 2000
  },
  {
    nombre: "Zona B1",
    sede_id: sedeCentroId,
    tipos_vehiculo: "carro",
    capacidad: 10,
    cupos_disponibles: 8,
    tarifa_hora: 3000
  },
  {
    nombre: "Zona B2",
    sede_id: sedeCentroId,
    tipos_vehiculo: "camion",
    capacidad: 5,
    cupos_disponibles: 3,
    tarifa_hora: 6000
  },
  {
    nombre: "Zona B3",
    sede_id: sedeCentroId,
    tipos_vehiculo: "vehiculoElectrico",
    capacidad: 8,
    cupos_disponibles: 7,
    tarifa_hora: 2500
  },
  {
    nombre: "Zona B4",
    sede_id: sedeCentroId,
    tipos_vehiculo: "moto",
    capacidad: 20,
    cupos_disponibles: 10,
    tarifa_hora: 2000
  },
  {
    nombre: "Zona B5",
    sede_id: sedeCentroId,
    tipos_vehiculo: "cuatrimoto",
    capacidad: 10,
    cupos_disponibles: 8,
    tarifa_hora: 2500
  },
  {
    nombre: "Zona C1",
    sede_id: sedeSurId,
    tipos_vehiculo: "carro",
    capacidad: 20,
    cupos_disponibles: 10,
    tarifa_hora: 2000
  },
  {
    nombre: "Zona C2",
    sede_id: sedeSurId,
    tipos_vehiculo: "camion",
    capacidad: 25,
    cupos_disponibles: 20,
    tarifa_hora: 5000
  },
  {
    nombre: "Zona C3",
    sede_id: sedeSurId,
    tipos_vehiculo: "bus",
    capacidad: 20,
    cupos_disponibles: 15,
    tarifa_hora: 4000
  },
  {
    nombre: "Zona C4",
    sede_id: sedeSurId,
    tipos_vehiculo: "moto",
    capacidad: 20,
    cupos_disponibles: 10,
    tarifa_hora: 1500
  },
  {
    nombre: "Zona C5",
    sede_id: sedeSurId,
    tipos_vehiculo: "furgoneta",
    capacidad: 15,
    cupos_disponibles: 10,
    tarifa_hora: 2500
  }
]);

