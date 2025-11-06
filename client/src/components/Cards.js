import { Link } from "react-router-dom";

export function Card({id_post, image, title, date}) {
  return (
    <div className="card">
      <Link to={`/blog/${id_post}`} className="card-link">
        {image && <img src={require("../images/planets/" + image + ".jpg")} alt="" />}
        <h2>{title}</h2>
      </Link>
    </div>
  );
}

  export function CardList({posts, text}){
    const list = posts
      .filter(post => post.title.toLowerCase().includes(text.toLowerCase()))
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(post => (
        <Card
          key={post.id_post}
          id_post={post.id_post}
          title={post.title}
          date={new Date(post.date).toLocaleDateString('es-MX')}
          image={post.image}
        />
      )
    );

    return(
     <div>
        {list.length > 0 ? list : <p>No se encontraron resultados.</p>}
     </div>
    );
  }