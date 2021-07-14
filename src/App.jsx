import "./App.css"
import React, { lazy, useState, Suspense, useRef, useEffect } from "react"

const NavBar = lazy(() => import("./components/NavBar/NavBar"))
const SearchBox = lazy(() => import("./components/SearchBox/SearchBox"))
const MoviesSuggestion = lazy(() => import("./components/MoviesSuggestion/MoviesSuggestion"))
const SearchResultsDetails = lazy(() =>
	import("./components/SearchResultsDetails/SearchResultsDetails")
)
const MoviesList = lazy(() => import("./components/MoviesList/MoviesList"))
const Pagination = lazy(() => import("./components/Pagination/Pagination"))
const ModalMovie = lazy(() => import("./components/ModalMovie/ModalMovie"))

function App() {
	const [page, setPage] = useState(() => 0)
	const [title, setTitle] = useState(() => "")
	const [movies, setMovies] = useState(() => [])
	const [movieId, setMovieId] = useState(() => "")
	const [isOpen, setIsOpen] = useState(() => false)
	const [preTitle, setPreTitle] = useState(() => "")
	const [preMovie, setPreMovie] = useState(() => {})
	const [isActive, setIsActive] = useState(() => false)
	const [totalResults, setTotalResults] = useState(() => "")
	const [totalPages, setTotalPages] = useState(() => "")
	const [moviesSuggestion, setMoviesSuggestion] = useState(() => [])

	const refTitle = useRef(() => "")
	const myContainer = useRef(() => null)
	const movieSuggestion = useRef(() => {})
	const refMoviesSuggestion = useRef(() => [])

	useEffect(() => {
		if (isOpen) {
			const portal = document.getElementById("portal")
			myContainer.current.parentNode.parentNode.style.overflowX = "hidden"
			myContainer.current.parentNode.parentNode.style.overflowY = "hidden"
			portal.style.zIndex = 5555
		} else if (!isOpen) {
			const portal = document.getElementById("portal")
			myContainer.current.parentNode.parentNode.style.overflowX = "auto"
			myContainer.current.parentNode.parentNode.style.overflowY = "auto"
			portal.style.zIndex = -1
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
				{/* NavBar */}
				<Suspense fallback={<h1>Loading.... </h1>}>
					<NavBar />
				</Suspense>

				<div className='separator'></div>

				{/* SearchBox */}
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
						totalPages={totalPages}
						setTotalPages={setTotalPages}
						isActive={isActive}
						setIsActive={setIsActive}
						preTitle={preTitle}
						setPreTitle={setPreTitle}
					/>
				</Suspense>

				{/* MoviesSuggestion */}
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
						onClick={onClick}
						setMovieId={setMovieId}
					/>
				</Suspense>

				{/* SearchResultsDetails */}
				<Suspense fallback={<h1>Loading.... </h1>}>
					<SearchResultsDetails title={title} totalResults={totalResults} />
				</Suspense>

				{/* MoviesList */}
				<Suspense fallback={<h1>Loading.... </h1>}>
					<MoviesList
						movies={movies}
						open={isOpen}
						onClick={onClick}
						title={title}
						setMovieId={setMovieId}
					/>
				</Suspense>

				{(totalResults || movies === []) && (
					<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				)}

				{/* Pagination */}
				<Suspense fallback={<h1>Loading.... </h1>}>
					<Pagination page={page} setPage={setPage} totalPages={totalPages} />
				</Suspense>

				{renderSeparators()}
			</div>

			{/* ModalMovie */}
			<Suspense fallback={<div></div>}>
				<ModalMovie
					open={isOpen}
					onClose={onClose}
					movieId={movieId}
					onClick={onClick}
					setMovieId={setMovieId}
				/>
			</Suspense>
		</>
	)
}

export default App
