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