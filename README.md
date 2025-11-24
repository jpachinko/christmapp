# 📘 App de Registros con Node.js + Express
Aplicación simple para registrar nombres y cantidades, guardando los datos en un archivo `data.json`.  
Incluye protección de edición por IP: **solo la persona que creó el registro puede editarlo**.

Perfecta para subir a **Render**, **Railway** o cualquier hosting con Node.js.

---

## 🚀 Funcionalidades

### ✔ Registrar nombre y cantidad  
Se agrega un nuevo registro con:
- Nombre
- Cantidad
- IP del usuario
- Fecha de registro

### ✔ Listar registros  
Los registros se muestran dinámicamente en la página.

### ✔ Editar registros (con protección)  
Un registro **solo puede ser editado por la misma IP que lo creó**.

### ✔ Guardado persistente en archivo  
Toda la información se guarda en:
