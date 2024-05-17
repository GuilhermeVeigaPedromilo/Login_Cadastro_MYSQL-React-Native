const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "local_cadastro_mysql",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// Rota para criar usuário
app.post("/api/createUser", (req, res) => {
    const { username, password } = req.body;
    const query = "INSERT INTO users (username, password) VALUES (?, ?)"; 
    db.query(query, [username, password], (err, result) => {
      if (err) {
        console.error("Erro ao criar usuário:", err);
        res.status(500).send("Erro ao criar usuário");
      } else {
        console.log(`Usuário criado com sucesso, dados: ${username} - ${password}`);
        res.send(result);
      }
    });
  });

  // Rota para buscar usuários
app.get("/api/readUsers", (req, res) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

app.listen(port, () => {
  console.log("----Login (MySQL version)-----");
  console.log(`Servidor rodando na porta ${port}`);
});