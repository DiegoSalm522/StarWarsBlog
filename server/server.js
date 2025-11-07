require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://star-wars-blog-ten.vercel.app/'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

/* Conexión a la bd con Neon */
const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('ERROR: DATABASE_URL no está definido');
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
    console.log('Conectado a la base de datos');
    obj.done();
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });

/* Endpoints */
app.get('/post', (req, res) => {
  db.any('SELECT * FROM post')
    .then((data) => res.json(data))
    .catch((error) => {
      console.log('ERROR: ', error);
      res.status(500).json({ error: 'Error al obtener posts' });
    })
})

app.get('/post/:id', (req, res) => {
  const id = req.params.id;
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
    .then(data => res.json(data))
    .catch(error => {
      console.log('ERROR:', error);
      res.status(500).json({ error: 'Error al obtener el post' });
    });
});

app.get('/author/:id', (req, res) => { 
  const id = req.params.id; 
  db.oneOrNone('SELECT * FROM author WHERE id_author = $1', [id]) 
    .then(data => res.json(data)) 
    .catch(error => {
      console.log('ERROR:', error);
      res.status(500).json({ error: 'Error al obtener el autor' });
    }); 
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});