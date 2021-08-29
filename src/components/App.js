import React, {useState, useEffect} from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const API_KEY = process.env.REACT_APP_API_KEY
const MOVIE_API_URL = `http://www.omdbapi.com/?s=man&apikey=${API_KEY}`;

const App = ()=>{
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(()=>{
    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonResponse =>{
      setMovies(jsonResponse.Search);
      setLoading(false);
    });
  },[]); //フックの第二引数で読み込むタイミングを指定

  const search = searchValue =>{ //Search.js内に定義されているsearch関数
    setLoading(true);
    setErrorMessage(null);

    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(jsonResponse =>{
        if(jsonResponse.Response === "True"){
          setMovies(jsonResponse.Search);
          setLoading(false);
        }else{
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
    };


  return(
    <div className="App">
      <Header text="Movie React" /> 
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ?(
          <span>loading...</span>
        ): errorMessage ?(
          <div className="errorMessage">{errorMessage}</div>
        ): (
          movies.map((movie, index)=>(
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))        
        )} 
      </div>
    </div>
  );
};

export default App;