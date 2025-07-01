// Estructura de la coleccion con JSONSchema
db.createCollection("usuarios", {
    validator: {
        $jsonSchema:{
            bsonType: "object",
            required: ["nombre","cedula","rol","email"],
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
                    enum:["administrador", "empleado", "cliente"],
                    description: "Rol del usuario, debe ser uno de los siguientes: administrador, empleado, cliente"
                },
                sede_id: {bsonType: "objectId"}
            }
        }
    }    
});

// Estructura de la coleccion con JSONSchema
db.createColection("vehiculos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["tipo", "marca", "modelo", "usuario_id"],
            properties: {
                placa: {
                    bsonType: "sting",
                    description: "Placa del vehiculo, debe ser un string con formato AAA-000"
                },
                tipo: {
                    bsonType: "string",
                    enum: [ "carro", "moto", "camion", "bicicleta", "cuatrimoto" ],
                    description: "Tipo de vehiculo, debe ser uno de los siguientes: carro, moto, camion, bicicleta, cuatrimoto"
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
            },
            allOf: [
                {
                    if: {
                        properties: { tipo: { const: ["carro", "camion"] } }
                    },
                    then: {
                        properties: {
                            placa: {
                                pattern: "^[A-Z]{3}[0-9]{3}$",
                                description: "Placa de carro, debe ser un string con formato AAA-000"
                            }
                        }
                    }
                },
                {
                    if: {
                        properties: { tipo: { const: ["moto" , "cuatrimoto"]}}
                    }, 
                    then: {
                        properties: {
                            placa: {
                                pattern: "^[A-Z]{3}[0-9]{2}[A-Z]{1}$",
                                description: "Placa de moto, debe ser un string con formato AAA-00A"
                            }
                        }
                    }
                },
                {
                    if: {
                        properties: { tipo: {const: "bicicleta"}}
                    }, then: {
                        properties:{
                            placa: {
                                bsonType: ["null", "string"],
                                description: "Placa de bicicleta, puede ser null o un string vacio"
                            }
                        }
                    }
                }
            ]
        }
    }});
// Índice único en placa, pero solo para documentos que tengan placa
db.vehiculos.createIndex(
  { placa: 1 },
  { unique: true, partialFilterExpression: { placa: { $exists: true } } }
);


db.createCollection("sedes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "direccion", "telefono"],
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
                    pattern: "^\\+?[0-9]{10,15}$",
                    description: "Teléfono de contacto de la sede, debe ser un string con formato internacional"
                }
            },
            additionalProperties: false
            
        }
    }
});