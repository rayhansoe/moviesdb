import "./App.css"
import React, { lazy, useState, Suspense, useRef } from "react"
// import { handleError, handleResponse } from "./tools/apiUtils"
// import { delays } from "./tools/delays"
const Header = lazy(() => import("./components/Header"))
const SearchBox = lazy(() => import("./components/SearchBox"))

function App() {
	const [title, setTitle] = useState(() => "")
	const [movies, setMovies] = useState(() => [])
	const [page, setPage] = useState(() => 1)
	const _title = useRef(() => "")
	const prevMovies = useRef(() => [])

	// const fetchResponse = useMemo(() => handleResponse, [])
	// const fetchError = useMemo(() => handleError, [])

	// useEffect(() => {
	// 	if (title.length === 0) {
	// 		console.log("title kosong saat useEffect")
	// 		setMovies(() => [])
	// 	} else {
	// 		const url = `https://www.omdbapi.com/?s=${title}&apikey=41eec44f&page=${page}`
	// 		let a = fetch(url)
	// 		a = a.then(fetchResponse).catch(fetchError)
	// 		a.then(data => {
	// 			if (data.Error === "Movie not found!") {
	// 				setMovies(() => [])
	// 				console.log(url)
	// 				console.log("movie not found")
	// 			} else {
	// 				setMovies(() => data.Search)
	// 				console.log(url)
	// 				console.log("fetch berhasil")
	// 			}
	// 		})
	// 	}
	// }, [fetchError, fetchResponse, page, title])

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
					<SearchBox
						onChange={handleChange}
						setTitle={setTitle}
						_title={_title}
						title={title}
						setPage={setPage}
						page={page}
						setMovies={setMovies}
						prevMovies={prevMovies}
					/>
				</Suspense>

				<h1 className='title'>{title}</h1>
				<div className='movies-list'>
					{movies.length === 0
						? console.log("movies kosong saat render")
						: movies.map(movie => {
								return (
									<div className='movie' key={movie.imdbID}>
										<img src={movie.Poster} alt='' />
									</div>
								)
						  })}
				</div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div>{movies.length === 0 ? "" : page}</div>
				{movies.length === 0 ? (
					""
				) : (
					<button
						onClick={() => {
							setPage(prevPage => prevPage + 1)
						}}>
						+
					</button>
				)}
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
			</div>
		</>
	)
}

export default App
