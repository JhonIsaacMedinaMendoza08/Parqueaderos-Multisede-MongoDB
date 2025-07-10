
db.createCollection("sedes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "direccion", "ciudad", "telefono", "zonas"],
      properties: {
        nombre: { bsonType: "string" },
        direccion: { bsonType: "string" },
        ciudad: { bsonType: "string" },
        telefono: {
          bsonType: "string",
          pattern: "^[0-9]{10,15}$"
        },
        zonas: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["nombre", "tipos_vehiculo", "capacidad", "cupos_disponibles", "tarifa_hora"],
            properties: {
              nombre: { bsonType: "string" },
              tipos_vehiculo: {
                bsonType: "array",
                items: {
                  enum: ["carro", "moto", "camion", "bicicleta", "cuatrimoto", "vehiculoElectrico", "bus", "furgoneta"]
                }
              },
              capacidad: { bsonType: "double", minimum: 1 },
              cupos_disponibles: { bsonType: "double", minimum: 0 },
              tarifa_hora: { bsonType: "double", minimum: 0 }
            }
          }
        }
      }
    }
  }
});

db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "cedula", "rol", "email", "fecha_creacion"],
      properties: {
        nombre: { bsonType: "string" },
        cedula: {
          bsonType: "string",
          pattern: "^[0-9]{10}$"
        },
        email: {
          bsonType: "string",
          pattern: "^\\S+@\\S+\\.\\S+$"
        },
        rol: {
          bsonType: "string",
          enum: ["administrador", "empleado", "cliente"]
        },
        clave: { bsonType: ["string", "null"] },
        sede_id: { bsonType: "objectId" },
        fecha_creacion: { bsonType: "date" },
        suscripcion: {
          bsonType: ["object", "null"],
          properties: {
            tipo: {
              bsonType: "string",
              enum: ["diario", "semanal", "mensual", "trimestral", "semestral", "anual"]
            }
          }
        },
        vehiculos: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["tipo", "marca", "modelo"],
            properties: {
              placa: {
                bsonType: ["string", "null"],
                pattern: "^([A-Z]{3}[0-9]{3}|[A-Z]{3}[0-9]{2}[A-Z]{1})$"
              },
              tipo: {
                enum: ["carro", "moto", "camion", "bicicleta", "cuatrimoto", "vehiculoElectrico", "bus", "furgoneta"]
              },
              marca: { bsonType: "string" },
              modelo: { bsonType: "string" }
            }
          }
        }
      }
    }
  }
});
db.usuarios.createIndex({ cedula: 1 }, { unique: true });

// Colección PARQUEOS sin embebidos pero con denormalización parcial

db.createCollection("parqueos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["placa", "sede_id", "zona_id", "hora_entrada"],
      properties: {
        placa: { bsonType: ["string", "null"] },
        sede_id: { bsonType: "objectId" },
        zona_id: { bsonType: "objectId" },
        tipo_vehiculo: { bsonType: "string" },
        hora_entrada: { bsonType: "date" },
        hora_salida: { bsonType: ["date", "null"] },
        tiempo_total_min: { bsonType: ["double", "null"], minimum: 0 },
        costo: { bsonType: ["double", "null", "int"], minimum: 0 }
      }
    }
  }
});
db.parqueos.createIndex({ sede_id: 1, zona_id: 1 });
