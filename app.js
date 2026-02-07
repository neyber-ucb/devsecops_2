const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(express.json());

/*
====================================
S — Spoofing (Suplantación)
❌ No hay autenticación real
====================================
*/
app.get("/admin", (req, res) => {
  // Cualquiera puede acceder
  res.send("Admin access granted");
});

/*
====================================
T — Tampering (Manipulación)
❌ eval con entrada del usuario
====================================
*/
app.get("/calc", (req, res) => {
  const input = req.query.expr;
  eval("result = " + input); // ❌ INSEGURO
  res.send("Calculated");
});

/*
====================================
R — Repudiation (No repudio)
❌ No hay logs ni trazabilidad
====================================
*/
app.post("/update", (req, res) => {
  // No se registra quién hizo el cambio
  res.send("Updated");
});

/*
====================================
I — Information Disclosure
❌ Credenciales hardcodeadas
====================================
*/
const DB_USER = "admin";
const DB_PASSWORD = "admin123"; // ❌ SECRETO EN CÓDIGO

/*
====================================
D — Denial of Service (DoS)
❌ Loop potencialmente infinito
====================================
*/
app.get("/dos", (req, res) => {
  while (true) {} // ❌ BLOQUEA EL SERVIDOR
});

/*
====================================
E — Elevation of Privilege
❌ Ejecución de comandos del sistema
====================================
*/
app.get("/exec", (req, res) => {
  const cmd = req.query.cmd;
  exec(cmd, (err, stdout) => {
    res.send(stdout);
  });
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
