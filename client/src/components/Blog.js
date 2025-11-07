import {CardList} from "./Cards";
import { useEffect, useState } from "react";

export default function Blog(){
  const [filterText, setFilterText] = useState("");
  const [data, setData] = useState([]);
  
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_URL}/post`)
      .then((res) => res.json())
      .then((posts) => setData(posts))
      .catch(e => {
        console.log(e);
      })
  }, [API_URL]);

  function handleChange(e){
    setFilterText(e.target.value);
  }

  return(
    <div>
      <h1>Planets</h1>
      <div className="filter">
        <p>Search by title:</p>
        <input type="text" value={filterText} onChange={handleChange}></input>
      </div>
      <CardList posts={data} text={filterText}></CardList>
    </div>
  );
}