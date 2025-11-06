require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/* Conexión a la bd */
const pgp = require('pg-promise')();
const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    allowExitOnIdle: true
}
const db = pgp(cn);

/* Endpoints */
app.get('/post', (req, res) =>{
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
app.listen(PORT, ()=>{
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})