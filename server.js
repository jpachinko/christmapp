const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = path.join(__dirname, "data.json");

// Crear archivo inicial si no existe
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

// Obtener IP real
function getIP(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress
  );
}

// Obtener registros
app.get("/registros", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// Agregar registro
app.post("/agregar", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));

  const nuevo = {
    nombre: req.body.nombre,
    cantidad: req.body.cantidad,
    ip: getIP(req),
    fecha: new Date().toISOString()
  };

  data.push(nuevo);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ mensaje: "Registro agregado correctamente" });
});

// Editar registro
app.put("/editar/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = JSON.parse(fs.readFileSync(DATA_FILE));

  if (!data[id]) {
    return res.json({ mensaje: "Registro no encontrado" });
  }

  const ip = getIP(req);

  if (ip !== data[id].ip) {
    return res.json({
      mensaje: "No tienes permiso para editar este registro"
    });
  }

  data[id].nombre = req.body.nombre;
  data[id].cantidad = req.body.cantidad;

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ mensaje: "Registro editado" });
});

// Render recomienda usar su puerto asignado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor funcionando en puerto " + PORT));
