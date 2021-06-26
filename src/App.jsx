import "./App.css"
import React, { lazy, useState, Suspense, useRef, useEffect } from "react"

const Header = lazy(() => import("./components/Header"))
const SearchBox = lazy(() => import("./components/SearchBox"))
const MoviesList = lazy(() => import("./components/MoviesList"))
const MoviesSuggestion = lazy(() => import("./components/MoviesSuggestion"))
const Pagination = lazy(() => import("./components/Pagination"))
const SearchResultsDetails = lazy(() => import("./components/SearchResultsDetails"))
const ModalMovie = lazy(() => import("./components/ModalMovie"))

function App() {
	const [page, setPage] = useState(() => 0)
	const [title, setTitle] = useState(() => "")
	const [movies, setMovies] = useState(() => [])
	const [imdbID, setImdbID] = useState(() => "")
	const [isOpen, setIsOpen] = useState(() => false)
	const [preTitle, setPreTitle] = useState(() => "")
	const [preMovie, setPreMovie] = useState(() => {})
	const [isActive, setIsActive] = useState(() => false)
	const [totalResults, setTotalResults] = useState(() => "")
	const [moviesSuggestion, setMoviesSuggestion] = useState(() => [])

	const refTitle = useRef(() => "")
	const myContainer = useRef(() => null)
	const movieSuggestion = useRef(() => {})
	const refMoviesSuggestion = useRef(() => [])

	useEffect(() => {
		if (isOpen) {
			myContainer.current.parentNode.parentNode.style.overflowX = "hidden"
			myContainer.current.parentNode.parentNode.style.overflowY = "hidden"
			myContainer.current.parentNode.nextSibling.nextSibling.style.zIndex = 5555
		} else if (!isOpen) {
			myContainer.current.parentNode.parentNode.style.overflowX = "auto"
			myContainer.current.parentNode.parentNode.style.overflowY = "auto"
			myContainer.current.parentNode.nextSibling.nextSibling.style.zIndex = -1
		}
	}, [isOpen])

	const handleChange = e => {
		refTitle.current = e
	}

	const renderSeparators = () => {
		if (title && totalResults) {
			return <div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
		} else if ((title && totalResults === 0) || movies === 0) {
			return ""
		}
		return (
			<>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
			</>
		)
	}

	const onClick = () => setIsOpen(() => true)
	const onClose = () => setIsOpen(() => false)

	return (
		<>
			<div className='container' ref={myContainer}>
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
						setMoviesSuggestion={setMoviesSuggestion}
						refMoviesSuggestion={refMoviesSuggestion}
						totalResults={totalResults}
						setTotalResults={setTotalResults}
						isActive={isActive}
						setIsActive={setIsActive}
						preTitle={preTitle}
						setPreTitle={setPreTitle}
					/>
				</Suspense>

				<Suspense fallback={<h1>Loading.... </h1>}>
					<MoviesSuggestion
						isActive={isActive}
						moviesSuggestion={moviesSuggestion}
						preMovie={preMovie}
						preTitle={preTitle}
						movie={movieSuggestion}
						setPreMovie={setPreMovie}
						setMovies={setMovies}
						setTitle={setTitle}
						setIsActive={setIsActive}
						setPage={setPage}
						refMoviesSuggestion={refMoviesSuggestion}
					/>
				</Suspense>

				<Suspense fallback={<h1>Loading.... </h1>}>
					<SearchResultsDetails title={title} totalResults={totalResults} />
				</Suspense>

				{/* need to fix movies-list fail fetch*/}
				<Suspense fallback={<h1>Loading.... </h1>}>
					<MoviesList
						movies={movies}
						open={isOpen}
						onClick={onClick}
						onClose={onClose}
						setImdbID={setImdbID}
					/>
				</Suspense>

				{(totalResults || movies === []) && (
					<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				)}

				<Suspense fallback={<h1>Loading.... </h1>}>
					<Pagination page={page} setPage={setPage} totalResults={totalResults} />
				</Suspense>

				{renderSeparators()}
			</div>

			<Suspense fallback={<div></div>}>
				<ModalMovie open={isOpen} onClose={onClose} imdbID={imdbID} onClick={onClick} />
			</Suspense>
		</>
	)
}

export default App
