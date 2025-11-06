import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/post/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(e => console.log(e));
  }, [id]);

  if (!post) return;

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={require(`../images/planets/${post.image}.jpg`)} alt={post.title} className="img-post"/>
      <p className="text-post">Publicado por: <Link className="author-link" to={`../author/${post.id_author}`}>{post.author_name}</Link></p>
      <p className="text-post">Fecha de Publicación: {new Date(post.date).toLocaleDateString('es-MX')}</p>
      <p className="text-post">{post.text}</p>
      <br></br>
    </div>
  );
}
