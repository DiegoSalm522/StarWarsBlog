import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Author() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/author/${id}`)
      .then(res => res.json())
      .then(data => setAuthor(data))
      .catch(e => console.log(e));
  }, [id, API_URL]);

  if (!author) return;

  return (
    <div>
      <h1>{author.name}</h1>
      <img src={require(`../images/authors/${author.image}.jpg`)} alt={author.name} className="img-author"/>
    </div>
  );
}
