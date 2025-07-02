// ==============================
// Transacción: Registrar nuevo ingreso al parqueadero
// ==============================

// vehiculo3 marca: "Toyota", modelo: "Corolla", usuario_id: cliente3Id,placa: "WFV378"

const session = db.getMongo().startSession();
const dbSession = session.getDatabase("parqueaderos_multisede");
session.startTransaction();

try {
  const vehiculoId = db.vehiculos.findOne({ placa: "WFV378" })._id;
  const sedeId = db.sedes.findOne({ nombre: "Sede Norte" })._id;
  const zonaId = db.zonas.findOne({ nombre: "Zona A1" })._id;
  const fecha_ingreso = new Date();
  const horaEntrada = new Date();

  // ==============================
  // 1. Insertar nuevo parqueo
  // ==============================
  db.parqueos.insertOne({
    vehiculo_id: vehiculoId,
    sede_id: sedeId,
    zona_id: zonaId,
    fecha_ingreso: fecha_ingreso,
    hora_entrada: horaEntrada,
    hora_salida: null,
    tiempo_total_min: null,
    costo: null
  }, { session });

  // ==============================
  // 2. Actualizar zona (disminuir cupos disponibles)
  // ==============================
  const updateResult = db.zonas.updateOne(
    { _id: zonaId, cupos_disponibles: { $gt: 0 } },
    { $inc: { cupos_disponibles: -1 } },
    { session }
  );

  // Validar si se pudo disminuir el cupo
  if (updateResult.modifiedCount === 0) {
    throw new Error("No hay cupos disponibles en la zona seleccionada.");
  }

  // ==============================
  // Confirmar la transacción
  // ==============================
  session.commitTransaction();
  print("✅ Transacción completada exitosamente");

} catch (error) {
  // ==============================
  // Revertir en caso de error
  // ==============================
  session.abortTransaction();
  print("❌ Transacción abortada. Error:", error.message);

} finally {
  // Finalizar sesión
  session.endSession();
}
