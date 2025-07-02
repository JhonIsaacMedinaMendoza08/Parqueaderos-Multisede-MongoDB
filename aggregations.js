// ===============================================================
// 1. ¿Cuántos parqueos se registraron por sede en el último mes?
// ===============================================================
db.parqueos.aggregate([
  {
    $match: {
      hora_entrada: { $gte: ISODate("2025-05-28") }
    }
  },
  {
    $group: {
      _id: "$sede_id",
      totalParqueos: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "_id",
      foreignField: "_id",
      as: "sede"
    }
  },
  //convierte un documento que contiene un arreglo en varios documentos, uno por cada elemento del arreglo
  { $unwind: "$sede" },
  {
    $project: {
      _id: 0,
      sede: "$sede.nombre",
      totalParqueos: 1
    }
  }
])

// ===============================================================
// 2. ¿Cuáles son las zonas más ocupadas en cada sede?
// ===============================================================
db.parqueos.aggregate([
  {
    $group: {
      _id: { sede: "$sede_id", zona: "$zona_id" },
      conteo: { $sum: 1 }
    }
  },
  {
    $sort: { "_id.sede": 1, conteo: -1 }
  },
  {
    $group: {
      _id: "$_id.sede",
      zonaMasOcupada: { $first: "$_id.zona" },
      cantidadParqueos: { $first: "$conteo" }
    }
  },
    {
        $lookup: {
        from: "sedes",
        localField: "_id",
        foreignField: "_id",
        as: "sede"
        }
    },
    { $unwind: "$sede" },
    {
        $project: {
        _id: 0,
        sede: "$sede.nombre",
        zonaMasOcupada: 1,
        cantidadParqueos: 1
        }
    },
    {
        $lookup: {
            from: "zonas",
            localField: "zonaMasOcupada",
            foreignField: "_id",
            as: "zona"
        }
    },
    { $unwind: "$zona" },
    {
        $project: {
            sede: 1,
            zonaMasOcupada: "$zona.nombre",
            cantidadParqueos: 1
        }
    }
])
// ===============================================================
// 3. ¿Cuál es el ingreso total generado por parqueo en cada sede?
// ===============================================================
db.parqueos.aggregate([
  {
    $match: { costo: { $exists: true, $ne: null } }
  },
  {
    $group: {
      _id: "$sede_id",
      ingresoTotal: { $sum: "$costo" }
    }
  },
    {
        $lookup: {
        from: "sedes",
        localField: "_id",
        foreignField: "_id",
        as: "sede"
        }
    },
    { $unwind: "$sede" },
    {
        $project: {
        _id: 0,
        sede: "$sede.nombre",
        ingresoTotal: 1
        }
    }
]);
// ===============================================================
// 4. ¿Qué cliente ha usado más veces el parqueadero?
// ===============================================================
db.parqueos.aggregate([
  {
    $lookup: {
      from: "vehiculos",
      localField: "vehiculo_id",
      foreignField: "_id",
      as: "vehiculo"
    }
  },
  { $unwind: "$vehiculo" },
  {
    $group: {
      _id: "$vehiculo.usuario_id",
      totalUsos: { $sum: 1 }
    }
  },
  { $sort: { totalUsos: -1 } },
  { $limit: 1 },
    {
        $lookup: {
        from: "usuarios",
        localField: "_id",
        foreignField: "_id",
        as: "usuario"
        }
    },
    { $unwind: "$usuario" },
    {
        $project: {
        _id: 0,
        usuario: "$usuario.nombre",
        totalUsos: 1
        }
    }
])

// ===============================================================
// 5. ¿Qué tipo de vehículo es más frecuente por sede?
// ===============================================================

db.parqueos.aggregate([
  {
    $lookup: {
      from: "vehiculos",
      localField: "vehiculo_id",
      foreignField: "_id",
      as: "vehiculo"
    }
  },
  { $unwind: "$vehiculo" },
  {
    $group: {
      _id: { sede: "$sede_id", tipo: "$vehiculo.tipo" },
      total: { $sum: 1 }
    }
  },
  { $sort: { "_id.sede": 1, total: -1 } },
  {
    $group: {
      _id: "$_id.sede",
      tipoFrecuente: { $first: "$_id.tipo" },
      cantidad: { $first: "$total" }
    }
  },
    {
        $lookup: {
        from: "sedes",
        localField: "_id",
        foreignField: "_id",
        as: "sede"
        }
    },
    { $unwind: "$sede" },
    {
        $project: {
        _id: 0,
        sede: "$sede.nombre",
        tipoFrecuente: 1,
        cantidad: 1
        }
    }
])


// ================================================================
// 6. Dado un cliente, mostrar su historial de parqueos (fecha, 
// sede, zona, tipo de vehículo, tiempo y costo).
// ===============================================================

let clienteId = db.usuarios.findOne({ nombre: "Carlos Mendoza" })._id; 

db.parqueos.aggregate([
  {
    $lookup: {
      from: "vehiculos",
      localField: "vehiculo_id",
      foreignField: "_id",
      as: "vehiculo"
    }
  },
  { $unwind: "$vehiculo" },
  {
    $match: { "vehiculo.usuario_id": clienteId }
  },
  {    
    $lookup: {
      from: "sedes",
      localField: "sede_id",
      foreignField: "_id",
      as: "sede"
    }},
    { $unwind: "$sede" },
    { $lookup: {
      from: "zonas",
      localField: "zona_id",
      foreignField: "_id",
      as: "zona"
    }},
    { $unwind: "$zona" },
  {
    $project: {
        _id: 0,
        sede_id: "$sede.nombre",
        zona_id: "$zona.nombre",
        fecha: "$hora_entrada",
        tipo_vehiculo: "$vehiculo.tipo",
        tiempo: "$tiempo_total_min",
        costo: 1
    }
  }
]);

// ================================================================
// 7. Mostrar los vehículos parqueados actualmente en cada sede.
// ================================================================
db.parqueos.aggregate([
  {
    $match: { hora_salida: null }
  },
  {
    $group: {
      _id: "$sede_id",
      vehiculosActivos: { $addToSet: "$vehiculo_id" }
    }
  },
    {
        $lookup: {
        from: "sedes",
        localField: "_id",
        foreignField: "_id",
        as: "sede"
        }
    },
    { $unwind: "$sede" },
    {
        $project: {
        _id: 0,
        sede: "$sede.nombre",
        vehiculosActivos: 1
        }
    },
    {
        $lookup: {
        from: "vehiculos",
        localField: "vehiculosActivos",
        foreignField: "_id",
        as: "vehiculos"
        }
    },
    {
        $project: {
        sede: 1,
        vehiculos: {
            $map: {
            input: "$vehiculos",
            as: "vehiculo",
            in: {
                tipo: "$$vehiculo.tipo",
                placa: "$$vehiculo.placa",
                marca: "$$vehiculo.marca",
                modelo: "$$vehiculo.modelo"
            }
            }
        }
        }
    }   
]);

// ================================================================     
// 8. Listar zonas que han excedido su capacidad de parqueo en algún momento.
// ================================================================
db.parqueos.aggregate([
  {
    $group: {
      _id: "$zona_id",
      parqueosTotales: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "zonas",
      localField: "_id",
      foreignField: "_id",
      as: "zona"
    }
  },
  { $unwind: "$zona" },
  {
    $match: {
      $expr: { $gt: ["$parqueosTotales", "$zona.capacidad"] }
    }
  },
  {
    $project: {
      zona: "$zona.nombre",
      parqueosTotales: 1,
      capacidad: "$zona.capacidad"
    }
  }
])
