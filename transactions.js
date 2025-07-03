const session = db.getMongo().startSession();
const dbSession = session.getDatabase("parqueaderos_multisede");
session.startTransaction();

try {
  const vehiculoId = dbSession.vehiculos.findOne({ placa: "FRH920" })._id;
  const sedeId = dbSession.sedes.findOne({ nombre: "Sede Norte" })._id;
  const zonaId = dbSession.zonas.findOne({ nombre: "Zona A1" })._id;
  const horaEntrada = new Date();

  // Insertar el nuevo parqueo
  dbSession.parqueos.insertOne({
    vehiculo_id: vehiculoId,
    sede_id: sedeId,
    zona_id: zonaId,
    hora_entrada: horaEntrada,
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  }, { session });

  // Actualizar los cupos disponibles
  const updateResult = dbSession.zonas.updateOne(
    { _id: zonaId, cupos_disponibles: { $gt: 0 } },
    { $inc: { cupos_disponibles: -1 } },
    { session }
  );

  if (updateResult.modifiedCount === 0) {
    throw new Error("No hay cupos disponibles en la zona seleccionada.");
  }

  session.commitTransaction();
  print("✅ Transacción completada exitosamente");

} catch (error) {
  session.abortTransaction();
  print("❌ Transacción abortada. Error:", error.message);
} finally {
  session.endSession();
}
