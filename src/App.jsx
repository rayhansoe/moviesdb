import "./App.css"
import React, { lazy, useState, Suspense, useRef } from "react"
const Header = lazy(() => import("./components/Header"))
const SearchBox = lazy(() => import("./components/SearchBox"))
const MoviesList = lazy(() => import("./components/MoviesList"))
const Pagination = lazy(() => import("./components/Pagination"))
const SearchResultsDetails = lazy(() => import("./components/SearchResultsDetails"))

function App() {
	const [page, setPage] = useState(() => 0)
	const [title, setTitle] = useState(() => "")
	const [movies, setMovies] = useState(() => [])
	const [moviesSuggestion, setMoviesSuggestion] = useState(() => [])
	const [totalResults, setTotalResults] = useState(() => 0)
	const refTitle = useRef(() => "")
	const myContainer = useRef(() => null)
	const refMoviesSuggestion = useRef(() => [])

	const handleChange = e => {
		refTitle.current = e
	}

	const handleClick = e => {
		if (e.target === myContainer.current) {
			setMoviesSuggestion(() => [])
		}
	}

	const renderSeparators = () => {
		return title ? (
			<>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				{/* <div className='separator' style={{ backgroundColor: "#ffffff" }}></div> */}
			</>
		) : (
			<>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
			</>
		)
	}

	return (
		<>
			<div className='container' ref={myContainer} onClick={handleClick}>
				<Suspense fallback={<h1>Loading.... </h1>}>
					<Header />
				</Suspense>

				<div className='separator'></div>

				{/* need to fix search preview fail fetch*/}
				<Suspense fallback={<h1>Loading.... </h1>}>
					<SearchBox
						onChange={handleChange}
						setTitle={setTitle}
						refTitle={refTitle}
						title={title}
						setPage={setPage}
						page={page}
						setMovies={setMovies}
						moviesSuggestion={moviesSuggestion}
						setMoviesSuggestion={setMoviesSuggestion}
						refMoviesSuggestion={refMoviesSuggestion}
						totalResults={totalResults}
						setTotalResults={setTotalResults}
					/>
				</Suspense>

				<Suspense fallback={<h1>Loading.... </h1>}>
					<SearchResultsDetails title={title} totalResults={totalResults} />
				</Suspense>

				{/* need to fix movies-list fail fetch*/}
				<Suspense fallback={<h1>Loading.... </h1>}>
					<MoviesList movies={movies} />
				</Suspense>

				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>

				<Suspense fallback={<h1>Loading.... </h1>}>
					<Pagination page={page} setPage={setPage} totalResults={totalResults} />
				</Suspense>

				{renderSeparators()}
			</div>
		</>
	)
}

export default App
