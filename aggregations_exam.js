// =========================================================================================
// 1. Mostrar la cantidaad de parqueos realizados por tipo de vehiculo en cada sede
// =========================================================================================

db.parqueos.aggregate([
    {
      $group: {
        _id: { sede_id: "$sede_id", tipo_vehiculo: "$tipo_vehiculo" },
        total: { $sum: 1 }
      }
    },
    {
      $sort: { "_id.sede_id": 1, total: -1 }
    },
    {
      $group: {
        _id: "$_id.sede_id",
        tipo_vehiculo: { $first: "$_id.tipo_vehiculo" },
        total: { $first: "$total" }
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
        tipo_vehiculo: 1,
        total: 1
      }
    }
  ])


// =========================================================================================
// 2. Listar los clientes que han utilizado mas de 5 veces el parqueadero en el ultimo mes
// =========================================================================================


  db.usuarios.aggregate([
    { $unwind: "$vehiculos" },
    {
      $lookup: {
        from: "parqueos",
        localField: "vehiculos.placa",
        foreignField: "placa",
        as: "parqueos"
      }
    },
    {
      $project: {
        _id: 0,
        nombre: 1,
        total_parqueos: { $size: "$parqueos" }
      }
    },
    { $sort: { total_parqueos: -1 } },
    { $limit: 3 }
  ])
  



// ==========================================================================================
// 3. Calcular el promedio de tiempo de parqueo por tipo de vehiculo en una sede especifica
// ==========================================================================================

db.parqueos.aggregate([
    { $match: { sede_id: sedeSurId} },
    { $group: { _id: "$tipo_vehiculo", promedio_min: { $avg: "$tiempo_total_min" } } },
    { $sort: { promedio_min: -1 } },
  ]);

  db.parqueos.aggregate([
    { $match: { sede_id: sedeCentroId} },
    { $group: { _id: "$tipo_vehiculo", promedio_min: { $avg: "$tiempo_total_min" } } },
    { $sort: { promedio_min: -1 } },
  ]);

  db.parqueos.aggregate([
    { $match: { sede_id: sedeNorteId} },
    { $group: { _id: "$tipo_vehiculo", promedio_min: { $avg: "$tiempo_total_min" } } },
    { $sort: { promedio_min: -1 } },
  ]);


  ///glglglg