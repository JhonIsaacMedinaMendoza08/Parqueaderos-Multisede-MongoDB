//Conéctate como el usuario empleado1:
//mongo -u empleado1 -p empleado123 --authenticationDatabase parqueaderos_multisede

// Conéctate como el usuario cliente:
// Puedes usar el siguiente comando en la terminal de MongoDB Shell para conectarte a la base
// mongo -u cliente -p cliente123 --authenticationDatabase parqueaderos_multisede


const session = db.getMongo().startSession();
const dbSession = session.getDatabase("parqueaderos_multisede");
session.startTransaction();

try {
  const cliente = dbSession.usuarios.findOne({
    "vehiculos.placa": "FRH920"
  });

  if (!cliente) throw new Error("Vehículo no encontrado en usuarios.");

  const sede = dbSession.sedes.findOne({ nombre: "Sede Norte" });
  if (!sede) throw new Error("Sede no encontrada.");

  const zona = sede.zonas.find(z => z.nombre === "Zona A1");
  if (!zona) throw new Error("Zona no encontrada en sede.");

  if (zona.cupos_disponibles <= 0) {
    throw new Error("No hay cupos disponibles en la zona seleccionada.");
  }

  // Insertar parqueo
  dbSession.parqueos.insertOne({
    placa: "FRH920",
    tipo_vehiculo: cliente.vehiculos.find(v => v.placa === "FRH920").tipo,
    sede_id: sede._id,
    zona_id: zona._id,
    hora_entrada: new Date(),
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  }, { session });

  // Actualizar zona embebida dentro de sedes
  const updateResult = dbSession.sedes.updateOne(
    {
      _id: sede._id,
      "zonas._id": zona._id,
      "zonas.cupos_disponibles": { $gt: 0 }
    },
    {
      $inc: { "zonas.$.cupos_disponibles": -1 }
    },
    { session }
  );

  if (updateResult.modifiedCount === 0) {
    throw new Error("No fue posible reducir el cupo de la zona.");
  }

  session.commitTransaction();
  print("✅ Transacción completada exitosamente");

} catch (error) {
  session.abortTransaction();
  print("❌ Transacción abortada. Error:", error.message);
} finally {
  session.endSession();
}
