import "./App.css"
import {Routes, Route, NavLink} from "react-router-dom";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Post from "./components/Post";
import Author from "./components/Author";

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contact">Contacto</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/blog" element={<Blog></Blog>}></Route>
        <Route path="/blog/:id" element={<Post/>} />
        <Route path="/author/:id" element={<Author/>} />
        <Route path="/contact" element={<Contact></Contact>}></Route>
      </Routes>
    </div>
  );
}

export default App;
