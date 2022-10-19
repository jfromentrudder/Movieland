import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=c5ac435b';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const searchMovies = async (title) => {
		const res = await fetch(`${API_URL}&s=${title}`);
		const data = await res.json();

		setMovies(data.Search);
	};

	useEffect(() => {
		searchMovies('Avengers');
	}, []);

	return (
		<div className="app">
			<h1>MovieLand</h1>

			<div className="search">
				<input placeholder="Search for Movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
				<img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
			</div>

			{
				movies?.length > 0
					?
					<div className="container">
						{movies.map((movie) => {
							return < MovieCard key={movie.imdbID} movie = { movie } />;
						})}
					</div>
					:
					<div className='empty'>
						<h2>No Movies Found</h2>	
					</div>
			}

		</div>
	);
};

export default App;
