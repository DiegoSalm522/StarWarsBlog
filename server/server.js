require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Configurar CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));

app.use(express.json());

/* Conexión a la bd con Neon */
const pgp = require("pg-promise")();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("ERROR: DATABASE_URL no está definido");
  process.exit(1);
}

const db = pgp({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test de conexión
db.connect()
  .then(obj => {
    console.log("Conectado a la base de datos correctamente");
    obj.done();
  })
  .catch(error => {
    console.error("Error al conectar a la base de datos:", error);
  });

/* Endpoints */
app.get("/post", (req, res) => {
  console.log("Request recibida en /post");
  db.any("SELECT * FROM post")
    .then((data) => {
      console.log("Posts obtenidos:", data.length);
      res.json(data);
    })
    .catch((error) => {
      console.error("ERROR en /post:", error);
      res.status(500).json({ error: "Error al obtener posts", details: error.message });
    })
})

app.get("/post/:id", (req, res) => {
  const id = req.params.id;
  console.log("Request recibida en /post/" + id);
  db.oneOrNone(`
    SELECT 
      p.id_post,
      p.title,
      p.date,
      p.image,
      p.text,
      p.id_author,
      a.name AS author_name
    FROM post p
    JOIN author a ON p.id_author = a.id_author
    WHERE p.id_post = $1
  `, [id])
    .then(data => {
      console.log("Post obtenido:", data);
      res.json(data);
    })
    .catch(error => {
      console.error("ERROR en /post/:id:", error);
      res.status(500).json({ error: "Error al obtener el post", details: error.message });
    });
});

app.get("/author/:id", (req, res) => { 
  const id = req.params.id;
  console.log("Request recibida en /author/" + id);
  db.oneOrNone("SELECT * FROM author WHERE id_author = $1", [id]) 
    .then(data => {
      console.log("Author obtenido:", data);
      res.json(data);
    }) 
    .catch(error => {
      console.error("ERROR en /author/:id:", error);
      res.status(500).json({ error: "Error al obtener el autor", details: error.message });
    }); 
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API Star Wars Blog funcionando correctamente" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});