# 🚗 Campus Parking - Parqueaderos Multisede

**Campus Parking** es un sistema de gestión de parqueaderos distribuidos en múltiples sedes y ciudades. Esta solución fue diseñada con **MongoDB** como motor NoSQL, permitiendo una estructura flexible, segura y con consultas eficientes. Aquí se gestionan usuarios, vehículos, zonas de parqueo, sedes y transacciones de ingreso y salida.

---

## 🧠 Justificación del uso de MongoDB

- Permite manejar estructuras flexibles sin un esquema rígido.
- Se adapta fácilmente al crecimiento de la información.
- Ideal para manejar documentos referenciados entre colecciones como usuarios, vehículos y parqueos.
- Permite definir **validaciones $jsonSchema**, índices y roles personalizados.
- Excelente soporte para **consultas de agregación**, transacciones y control de acceso.

---

## 🧩 Diseño del modelo de datos

### 📁 Colecciones creadas:

- `usuarios`
- `vehiculos`
- `sedes`
- `zonas`
- `parqueos`

### 🔗 Uso de referencias vs embebidos

- **Referencias**: entre usuarios → vehículos, parqueos → zonas, zonas → sedes, parqueos → usuarios y parqueos → vehículos.
- **Embebido**: usado opcionalmente en campos como `suscripcion` dentro de `usuarios`.

---

## ✅ Validaciones por colección ($jsonSchema)

Cada colección fue creada con validaciones que incluyen tipos, campos obligatorios, patrones (`pattern`) e `enum`.

### 🧍‍♂️ Usuarios

```json
{
  "rol": {
    "enum": ["administrador", "empleado", "cliente"]
  },
  "cedula": {
    "pattern": "^[0-9]{10}$"
  },
  "email": {
    "pattern": "^\S+@\S+\.\S+$"
  },
  "suscripcion": {
    "tipo": {
      "enum": ["diario", "semanal", "mensual", "trimestral", "semestral", "anual"]
    }
  }
}
```

### 🚘 Vehículos

Validación específica de placas:

- Carros, camiones, buses, furgonetas, eléctricos: `AAA000`
- Motos, cuatrimotos: `AAA00A`
- Bicicletas: pueden tener `null` o un string vacío

### 🏢 Sedes y 🅿️ Zonas

- Cada zona se referencia a una sede.
- Tiene `tipos_vehiculo` permitidos, capacidad máxima, cupos disponibles y tarifa.

### 🅿️ Parqueos

Campos validados:

- `vehiculo_id`, `sede_id`, `zona_id` (ObjectId)
- `hora_entrada`, `hora_salida` (Date)
- `tiempo_total_min` (int >= 0)
- `costo` (double >= 0)

---

## 🧭 Índices definidos

### Índices simples

- `placa` en `vehiculos` (único)
- `cedula` en `usuarios` (único)

### Índices compuestos

- `sede_id + zona_id` en `parqueos`

```js
db.vehiculos.createIndex({ placa: 1 }, { unique: true })
db.usuarios.createIndex({ cedula: 1 }, { unique: true })
db.parqueos.createIndex({ sede_id: 1, zona_id: 1 })
```

---

## 🧪 Datos de prueba (`test_dataset.js`)

### 🏙️ Sedes (3)

- Sede Norte (Bogotá)
- Sede Centro (Medellín)
- Sede Sur (Cali)

### 🔲 Zonas (15)

- 5 zonas por sede, con tipos de vehículos permitidos, capacidad y tarifas.

### 👥 Usuarios

- 10 empleados distribuidos entre las sedes
- 15 clientes con datos completos (email, cédula, suscripción, etc.)
- 1 administrador por sede

### 🚗 Vehículos

- 30 vehículos asignados a los clientes
- Tipos: carros, motos, bicicletas, camiones, buses, eléctricos, cuatrimotos, furgonetas

### 🅿️ Parqueos

- 50 registros
- Con mezcla de sedes, zonas y vehículos
- Algunos activos (sin hora de salida)

---

## 📊 Consultas de agregación (`aggregations.js`)

1. ¿Cuántos parqueos se registraron por sede en el último mes?
2. ¿Zonas más ocupadas por sede?
3. ¿Ingreso total generado por sede?
4. ¿Cliente con más parqueos?
5. ¿Tipo de vehículo más frecuente por sede?
6. Historial de parqueos por cliente
7. Vehículos actualmente parqueados
8. Zonas que excedieron su capacidad de parqueo en algún momento

---

## 🔐 Roles y seguridad (`roles.js`)

### Roles personalizados

- **Administrador**: acceso total.
- **Empleado**: lectura de usuarios y vehículos, ingreso/salida parqueos.
- **Cliente**: solo lectura de su información, parqueos y zonas.

### Creación de usuarios

```js
db.createUser({
  user: "admin1",
  pwd: "admin123",
  roles: [{ role: "administrador", db: "parqueaderos_multisede" }]
});
```

---

## 🔄 Transacciones (`transactions.js`)

### Escenario

Registrar ingreso de un vehículo:

- Insertar en `parqueos`
- Disminuir `cupos_disponibles` en `zonas`

### Código resumido

```js
session.startTransaction();
try {
  db.parqueos.insertOne(..., { session });
  db.zonas.updateOne(..., { session });
  session.commitTransaction();
} catch (e) {
  session.abortTransaction();
} finally {
  session.endSession();
}
```

---

## 🧾 Autor

**Desarrollado por:**  
📛 Jhon Isaac Medina Mendoza  
🎓 Backend Developer - Campuslands  
📅 Julio 2025  
🔒 Proyecto académico: MongoDB Backend para sistema de parqueaderos multisede  
📁 Repositorio privado compartido con el Trainer  

---

## ✅ Estado del proyecto

🟢 Finalizado y probado localmente.  
📘 Listo para presentación y entrega académica.
📅 Duración y cobro automático

---

---

## ✅ Mejoras

🟢 Manejo correcto del Historial de suscripciones y de suscripciones ya que actualmente no se maneja de esa forma la base de datos pero esta es escalable. 
📘 Adicionar mas indices compuestos


---

## 📬 Contacto

📧 Correo: jhonisaacmedinamendoza08@outlook.com
📱 GitHub: [github.com/JhonIsaacMedinaMendoza08](https://github.com/JhonIsaacMedinaMendoza08)

---

> “El mejor código es aquel que no solo funciona, sino que también se entiende fácilmente.”  
> —- Campus Parking 🚗