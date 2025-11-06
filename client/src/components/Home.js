import { Link } from "react-router-dom";
import coverImage from "../images/home/starwars.jpeg";

export default function Home() {
  return (
    <section className="hero">
      <img src={coverImage} alt="Portada" className="cover-image" />
      <div className="overlay"></div>
      <div className="content-home">
        <h1>Blog de Planetas de Star Wars</h1>
        <Link to="/blog/" className="go-to-blog-button">
          Ir al Blog
        </Link>
      </div>
    </section>
  );
}