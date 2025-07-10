// ===============================================================
// 1. ¿Cuántos parqueos se registraron por sede en el último mes?
// ===============================================================
db.parqueos.aggregate([
  {
    $match: {
      hora_entrada: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) }
    }
  },
  {
    $group: {
      _id: "$sede_id",
      total_parqueos: { $sum: 1 }
    }
  }
])

// ===============================================================
// 2. ¿Cuáles son las zonas más ocupadas en cada sede?
// ===============================================================
db.parqueos.aggregate([
  {
    $group: {
      _id: { sede_id: "$sede_id", zona_id: "$zona_id" },
      cantidad: { $sum: 1 }
    }
  },
  {
    $sort: { "_id.sede_id": 1, cantidad: -1 }
  },
  {
    $group: {
      _id: "$_id.sede_id",
      zona_mas_ocupada: { $first: "$_id.zona_id" },
      cantidad: { $first: "$cantidad" }
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
      zona_mas_ocupada: "sede.zonas.nombre",
      cantidad: 1
    }
  }
])
// ===============================================================
// 3. ¿Cuál es el ingreso total generado por parqueo en cada sede?
// ===============================================================
db.parqueos.aggregate([
  {
    $match: { costo: { $ne: null } }
  },
  {
    $group: {
      _id: "$sede_id",
      ingreso_total: { $sum: "$costo" }
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
      ingreso_total: 1
    } 
  }
]);
// ===============================================================
// 4. ¿Qué cliente ha usado más veces el parqueadero?
// ===============================================================
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
  { $limit: 1 }
])


// ===============================================================
// 5. ¿Qué tipo de vehículo es más frecuente por sede?
// ===============================================================


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
      tipo_vehiculo_frecuente: { $first: "$_id.tipo_vehiculo" },
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
      tipo_vehiculo_frecuente: 1,
      total: 1
    }
  }
])



// ================================================================
// 6. Dado un cliente, mostrar su historial de parqueos (fecha, 
// sede, zona, tipo de vehículo, tiempo y costo).
// ===============================================================


// Reemplazar CEDULA_CLIENTE por el valor deseado
var cedulaCliente = "1010000001";
var cliente = db.usuarios.findOne({ cedula: cedulaCliente });

if (cliente) {
  var placas = cliente.vehiculos.map(v => v.placa).filter(p => p !== null);
  db.parqueos.find(
    { placa: { $in: placas } },
    { hora_entrada: 1, hora_salida: 1, tiempo_total_min: 1, costo: 1, sede_id: 1, zona_id: 1, tipo_vehiculo: 1 }
  );
}



// ================================================================
// 7. Mostrar los vehículos parqueados actualmente en cada sede.
// ================================================================
db.parqueos.aggregate([
  { $match: { hora_salida: null } },
  {
    $group: {
      _id: "$sede_id",
      placas: { $addToSet: "$placa" }
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
      placas: 1
    }
  }
]);

// ================================================================     
// 8. Listar zonas que han excedido su capacidad de parqueo en algún momento.
// ================================================================
db.sedes.aggregate([
  { $unwind: "$zonas" },
  {
    $lookup: {
      from: "parqueos",
      let: { zonaId: "$zonas._id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$zona_id", "$$zonaId"] } } },
        { $count: "usos" }
      ],
      as: "uso_zona"
    }
  },
  {
    $project: {
      nombre_sede: "$nombre",
      zona: "$zonas.nombre",
      capacidad: "$zonas.capacidad",
      usos: { $arrayElemAt: ["$uso_zona.usos", 0] }
    }
  },
  {
    $match: {
      $expr: { $gt: ["$usos", "$capacidad"] }
    }
  }
])

// ================================================================
// 9. Contar la cantidad total de usuarios por rol.
// ================================================================
db.usuarios.aggregate([{ $group: { _id: '$rol', total: { $sum: 1 } } }])

// ================================================================
// 10. Listar las sedes con su ciudad y cantidad de zonas.
// ================================================================
db.sedes.aggregate([{ $project: { nombre: 1, ciudad: 1, cantidad_zonas: { $size: '$zonas' } } },
  { $sort: { cantidad_zonas: -1 } },
  {$project: { _id: 0, nombre: 1, ciudad: 1, cantidad_zonas: 1 }}
])

// ================================================================
// 11. Contar parqueos por sede en el último mes.
// ================================================================
db.parqueos.aggregate([
  { $match: { hora_entrada: { $gte: new Date("2025-06-10T00:00:00") } } },
  { $group: { _id: "$sede_id", total_parqueos: { $sum: 1 } } },
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
      total_parqueos: 1
    }
  }
])

// ================================================================
// 12. Listar todos los vehículos registrados en el sistema (clientes).
// ================================================================
db.usuarios.aggregate([
  { $match: { rol: "cliente" } },
  { $unwind: "$vehiculos" },
  { $project: { 
    _id: 0,
    cedula: 1, nombre: 1, "vehiculos.tipo": 1, "vehiculos.placa": 1 } }
])

// ================================================================
// 13. Promedio de duración (minutos) de parqueo por tipo de vehículo.
// ================================================================
db.parqueos.aggregate([
  { $match: { tiempo_total_min: { $ne: null } } },
  { $group: { _id: "$tipo_vehiculo", promedio_min: { $avg: "$tiempo_total_min" } } },
  { $sort: { promedio_min: -1 } }
])

// ================================================================
// 14. Ranking de zonas más utilizadas en la última semana.
// ================================================================
db.parqueos.aggregate([
  {
    $match: {
      hora_entrada: { $gte: new Date("2025-07-03T00:00:00") }
    }
  },
  {
    $group: {
      _id: "$zona_id",
      total_usos: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "sedes",
      pipeline: [
        { $unwind: "$zonas" },
        { $match: { "zonas._id": { $exists: true } } },
        { $project: { nombre_sede: "$nombre", zona_id: "$zonas._id", nombre_zona: "$zonas.nombre" } }
      ],
      as: "zona_info"
    }
  },
  {
    $unwind: "$zona_info"
  },
  {
    $match: {
      $expr: { $eq: ["$_id", "$zona_info.zona_id"] }
    }
  },
  {
    $project: {
      _id: 0,
      nombre_zona: "$zona_info.nombre_zona",
      nombre_sede: "$zona_info.nombre_sede",
      total_usos: 1
    }
  },
  {
    $sort: { total_usos: -1 }
  },
  { $limit: 5 }
]);

// ================================================================
// 15. Obtener ingresos promedio por parqueo agrupado por zona y sede.
// ================================================================
db.parqueos.aggregate([
  { $match: { costo: { $ne: null } } },
  {
    $group: {
      _id: { sede: "$sede_id", zona: "$zona_id" },
      ingreso_promedio: { $avg: "$costo" },
      total_usos: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "sedes",
      pipeline: [
        { $unwind: "$zonas" },
        {
          $project: {
            nombre_sede: "$nombre",
            zona_id: "$zonas._id",
            nombre_zona: "$zonas.nombre",
            sede_id: "$_id"
          }
        }
      ],
      as: "zona_info"
    }
  },
  { $unwind: "$zona_info" },
  {
    $match: {
      $expr: {
        $and: [
          { $eq: ["$_id.sede", "$zona_info.sede_id"] },
          { $eq: ["$_id.zona", "$zona_info.zona_id"] }
        ]
      }
    }
  },
  {
    $project: {
      _id: 0,
      sede: "$zona_info.nombre_sede",
      zona: "$zona_info.nombre_zona",
      ingreso_promedio: { $round: ["$ingreso_promedio", 2] },
      total_usos: 1
    }
  },
  { $sort: { ingreso_promedio: -1 } }
]);




// ================================================================
// Historial de parqueos de un cliente
// ================================================================
// ================================================================
// Mapeo auxiliar de nombres de sedes y zonas (extraído de test_dataset.js)
// ================================================================
var sedeMap = {
  [sedeNorteId]: "Sede Norte",
  [sedeCentroId]: "Sede Centro",
  [sedeSurId]: "Sede Sur"
};
var zonaMap = {
  [zonaA1]: "Zona A1", [zonaA2]: "Zona A2", [zonaA3]: "Zona A3", [zonaA4]: "Zona A4", [zonaA5]: "Zona A5",
  [zonaB1]: "Zona B1", [zonaB2]: "Zona B2", [zonaB3]: "Zona B3", [zonaB4]: "Zona B4", [zonaB5]: "Zona B5",
  [zonaC1]: "Zona C1", [zonaC2]: "Zona C2", [zonaC3]: "Zona C3", [zonaC4]: "Zona C4", [zonaC5]: "Zona C5"
};
// ==============================
// Historial de parqueos de un cliente
// ==============================
var cedulaCliente = "1010000002";
var cliente = db.usuarios.findOne({ cedula: cedulaCliente });

if (cliente) {
  print("👤 Cliente:", cliente.nombre);
  print("📧 Email:", cliente.email);
  print("🚗 Vehículos registrados:");

  var placas = cliente.vehiculos.map(v => {
    print("  - " + (v.placa || "(sin placa)") + " | Tipo: " + v.tipo + " | Marca: " + v.marca + " | Modelo: " + v.modelo);
    return v.placa;
  }).filter(p => p !== null);

  print("\n📄 Historial de Parqueos:\n");

  db.parqueos.find(
    { placa: { $in: placas } },
    {
      hora_entrada: 1,
      hora_salida: 1,
      tiempo_total_min: 1,
      costo: 1,
      sede_id: 1,
      zona_id: 1,
      tipo_vehiculo: 1,
      placa: 1
    }
  ).forEach(p => {
    print("🅿️  Placa: " + p.placa);
    print("   - Tipo de vehículo: " + p.tipo_vehiculo);
    print("   - Entrada: " + p.hora_entrada.toLocaleString());
    print("   - Salida : " + (p.hora_salida ? p.hora_salida.toLocaleString() : "En curso"));
    print("   - Tiempo : " + (p.tiempo_total_min || "N/D") + " min");
    print("   - Costo  : $" + (p.costo || "N/D"));
    print("   - Sede   : " + (sedeMap[p.sede_id] || "Desconocida"));
    print("   - Zona   : " + (zonaMap[p.zona_id] || "Desconocida"));
    print("-------------------------------------");
  });
} else {
  print("❌ Cliente no encontrado con cédula: " + cedulaCliente);
}
// ================================================================