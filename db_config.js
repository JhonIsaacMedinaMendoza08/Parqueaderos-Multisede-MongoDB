// Estructura de la coleccion sedes con JSONSchema
db.createCollection("sedes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "direccion", "ciudad", "telefono"],
            properties: {
                nombre: {
                    bsonType: "string",
                    description: "Nombre de la sede, debe ser un string no vacío"
                },
                direccion: {
                    bsonType: "string",
                    description: "Dirección de la sede, debe ser un string no vacío"
                },
                ciudad: {
                    bsonType: "string",
                    description: "Ciudad donde se encuentra la sede, debe ser un string no vacío"
                },
                telefono: {
                    bsonType: "string",
                    pattern: "^[0-9]{10,15}$",
                    description: "Teléfono de contacto de la sede, debe ser un string con formato internacional"
                }
            }
        }
    }
});

// Estructura de la coleccion zonas con JSONSchema
db.createCollection("zonas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "sede_id", "tipos_vehiculo", "capacidad", "cupos_disponibles", "tarifa_hora"],
            properties: {
                nombre: {
                    bsonType: "string",
                    description: "Nombre de la zona, debe ser un string no vacío"
                },
                sede_id: {
                    bsonType: "objectId",
                    description: "ID de la sede a la que pertenece la zona, debe ser un ObjectId"
                },
                tipos_vehiculo: {
                    bsonType: "array",
                    items: { enum: ["carro", "moto", "camion", "bicicleta", "cuatrimoto", "vehiculoElectrico", "bus", "furgoneta"] },
                    description: "Tipos de vehiculo permitidos en la zona, debe ser un array de strings con los siguientes valores: carro, moto, camion, bicicleta, cuatrimoto"
                },
                capacidad: {
                    bsonType: "int",
                    minimum: 1,
                    description: "Capacidad total de la zona, debe ser un entero mayor o igual a 1"
                },
                cupos_disponibles: {
                    bsonType: "int",
                    minimum: 0,
                    description: "Cupos disponibles en la zona, debe ser un entero mayor o igual a 0"
                },
                tarifa_hora: {
                    bsonType: "int",
                    minimum: 0,
                    description: "Tarifa por hora de parqueo en la zona, debe ser un número mayor o igual a 0"
                }
            }
        }
    }

});

// Estructura de la coleccion usuarios con JSONSchema
db.createCollection("usuarios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "cedula", "rol", "email", "fecha_creacion"],
            properties: {
                nombre: {
                    bsonType: "string",
                    description: "Nombre completo del usuario"
                },
                cedula: {
                    bsonType: "string",
                    pattern: "^[0-9]{10}$",
                    description: "Cedula del usuario, debe ser un string de 10 digitos"
                },
                email: {
                    bsonType: "string",
                    pattern: "^\\S+@\\S+\\.\\S+$",
                    description: "Email del usuario, debe ser un string con formato de email"
                },
                rol: {
                    bsonType: "string",
                    enum: ["administrador", "empleado", "cliente"],
                    description: "Rol del usuario, debe ser uno de los siguientes: administrador, empleado, cliente"
                },
                clave: {
                    bsonType: ["string", "null"],
                    description: "Clave del usuario; requerida si el rol no es 'cliente'"
                },
                sede_id: {
                    bsonType: "objectId",
                    description: "ID de la sede a la que pertenece el usuario, debe ser un ObjectId"
                },
                fecha_creacion: {
                    bsonType: "date",
                    description: "Fecha de creación del usuario, debe ser un objeto Date"
                },
                suscripcion: {
                    bsonType: ["object", "null"],
                    properties: {
                        tipo: {
                            bsonType: "string",
                            enum: ["diario", "semanal", "mensual", "trimestral", "semestral", "anual"],
                            description: "Tipo de suscripción del usuario, debe ser uno de los siguientes: diario, semanal, mensual, trimestral, semestral, anual"
                        }
                    }
                }
            }
        }
    }
});
db.usuarios.createIndex({ cedula: 1 }, { unique: true });

// Estructura de la coleccion vehiculos con JSONSchema
db.createCollection("vehiculos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["tipo", "marca", "modelo", "usuario_id"],
            properties: {
                placa: {
                    bsonType: ["string", "null"],
                    pattern: "^([A-Z]{3}[0-9]{3}|[A-Z]{3}[0-9]{2}[A-Z]{1})$",
                    description: "Placa del vehículo (formato AAA000 o AAA00A)"
                },
                tipo: {
                    bsonType: "string",
                    items: { enum: ["carro", "moto", "camion", "bicicleta", "cuatrimoto", "vehiculoElectrico", "bus", "furgoneta"] },
                    description: "Tipo de vehiculo, debe ser uno de los siguientes: carro, moto, camion, bicicleta, cuatrimoto, vehiculoElectrico, bus, furgoneta"
                },
                marca: {
                    bsonType: "string",
                    description: "Marca del vehiculo"
                },
                modelo: {
                    bsonType: "string",
                    description: "Modelo del vehiculo"
                },
                usuario_id: {
                    bsonType: "objectId",
                    description: "ID del usuario propietario del vehiculo, debe ser un ObjectId"
                }
            }
        }
    }
});
// Índice único en placa, pero solo para documentos que tengan placa
db.vehiculos.createIndex(
  { placa: 1 },
  {
    unique: true,
    partialFilterExpression: {
      placa: { $type: "string" }
    }
  }
);

// Estructura de la coleccion parqueos con JSONSchema
db.createCollection("parqueos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["vehiculo_id", "sede_id", "zona_id", "fecha_ingreso", "hora_entrada"],
            properties: {
                vehiculo_id: {
                    bsonType: "objectId",
                    description: "ID del vehiculo que se esta parqueando, debe ser un ObjectId"
                },
                sede_id: {
                    bsonType: "objectId",
                    description: "ID de la sede donde se esta parqueando, debe ser un ObjectId"
                },
                zona_id: {
                    bsonType: "objectId",
                    description: "ID de la zona donde se esta parqueando, debe ser un ObjectId"
                },
                hora_entrada: {
                    bsonType: "date",
                    description: "Hora de entrada del vehiculo al parqueadero, debe ser un objeto Date"
                },
                hora_salida: {
                    bsonType: ["date", "null"],
                    description: "Hora de salida del vehiculo del parqueadero, debe ser un objeto Date"
                },
                tiempo_total_min: {
                    bsonType: ["int", "null"],
                    minimum: 0,
                    description: "Tiempo total de parqueo en minutos, debe ser un entero mayor o igual a 0"
                },
                costo: {
                    bsonType: ["int", "null"],
                    minimum: 0,
                    description: "Costo total del parqueo, debe ser un número mayor o igual a 0"
                }

            }
        }
    }
});
db.parqueos.createIndex({ sede_id: 1, zona_id: 1 });



