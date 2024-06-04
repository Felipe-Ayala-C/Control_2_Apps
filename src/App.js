import "./App.css";

import { useState } from "react";
import useAxios from "./hook/useAxios";

function App() {
  const { response, error, loading, fetchData } = useAxios();
  const [queryInput, setQueryInput] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false); // Estado para controlar la visibilidad de los favoritos

  const addToFavorites = (fact) => {
    setFavorites([...favorites, fact]);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const fecthGETall = () => {
    fetchData({ url: "/jokes/random", method: "GET" });
  };

  const fecthGET = () => {
    if (queryInput.trim() !== "") {
      fetchData({ url: `/jokes/search?query=${queryInput}`, method: "GET" });
    }
  };

  return (
    <div className="App">
      <img src="https://i.pinimg.com/originals/0c/b7/3f/0cb73f580ed858fff4837c90a185f41a.jpg"/>
      <h1>CONTROL 2 TEL335</h1>
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      <button className="botonrandom" onClick={fecthGETall}> Broma random </button>
      <br />
      <button className="buttonx" onClick={fecthGET}> Hacer GET </button>
      <input
        className="inputclass"
        type="text"
        value={queryInput}
        onChange={(e) => setQueryInput(e.target.value)}
        placeholder="Añadir texto para buscar broma"
      />
      <br></br>
       <div>
        {response ? (
          Array.isArray(response.result) ? (
            response.result.map((joke, index) => (
              <div key={joke.id} style={{ marginBottom: '20px' }}>
                <h2>Fact {index + 1}:</h2>
                <p><strong>Categorias:</strong> {joke.categories.join(', ')}</p>
                <p><strong>Fecha de creacion:</strong> {joke.created_at}</p>
                <p><strong>Fact:</strong> {joke.value}</p>
                <button className="like-button" onClick={() => addToFavorites(joke)}>Me gusta</button>  
              </div>
            ))
          ) : (
            <pre style={{ textAlign: 'left', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(response, null, 2)}
            </pre>
          )
        ) : (
          <p></p>
        )}
        </div>
      <button className="favoritebutton"onClick={toggleFavorites}>Ver Favoritos</button>
      {showFavorites && (
        <div>
          <h2>Favoritos:</h2>
          {favorites.map((favorite, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h2>Fact {index + 1}:</h2>
              <p>
                <strong>Categorias:</strong> {favorite.categories.join(", ")}
              </p>
              <p>
                <strong>Fecha de creacion:</strong> {favorite.created_at}
              </p>
              <p>
                <strong>Fact:</strong> {favorite.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;