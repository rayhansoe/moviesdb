import "./App.css"
import React, { lazy, useState, Suspense, useEffect, useRef } from "react"
// import { delays } from "./tools/delays"
const Header = lazy(() => import("./components/Header"))
const SearchBox = lazy(() => import("./components/SearchBox"))

function App() {
	const [title, setTitle] = useState("Avengers")
	const [movies, setMovies] = useState([])
	const _title = useRef("")

	useEffect(() => {
		const a = fetch(`https://www.omdbapi.com/?s=${title}&apikey=41eec44f`)
		a.then(res => res.json()).then(data => setMovies(() => data.Search))
	}, [title])

	const handleChange = e => {
		_title.current = e
	}

	return (
		<>
			<div className='container'>
				<Suspense fallback={<h1>Loading.... </h1>}>
					<Header />
				</Suspense>

				<div className='separator'></div>

				<Suspense fallback={<h1>Loading.... </h1>}>
					<SearchBox onChange={handleChange} setTitle={setTitle} preTitle={_title} />
				</Suspense>

				<h1 className='title'>{title}</h1>
				<div className='movies-list'>
					{movies.length === 0
						? []
						: movies.map(movie => {
								return (
									<div className='movie' key={movie.imdbID}>
										<img src={movie.Poster} alt='' />
									</div>
								)
						  })}
				</div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
			</div>
		</>
	)
}

export default App
