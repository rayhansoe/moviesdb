import "./App.css"
import React, { lazy, useState, Suspense, useRef } from "react"
const Header = lazy(() => import("./components/Header"))
const SearchBox = lazy(() => import("./components/SearchBox"))

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

	const renderPagination = () => {
		let arr = []
		if (totalResults) {
			for (let i = 0; i < Math.ceil(totalResults / 10); i++) {
				arr.push(i)
			}
		}
		return arr
	}

	return (
		<>
			<div
				className='container'
				ref={myContainer}
				onClick={e => {
					if (e.target === myContainer.current) {
						setMoviesSuggestion(() => [])
					}
				}}>
				<Suspense fallback={<h1>Loading.... </h1>}>
					<Header />
				</Suspense>

				<div className='separator'></div>

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

				<h1 className='title'>{title}</h1>
				<div className='movies-list'>
					{movies.length !== 0 &&
						movies.map(movie => {
							return (
								<div className='movie' key={movie.imdbID}>
									<img src={movie.Poster} alt='' />
								</div>
							)
						})}
				</div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='pagination'>
					{/* need to fix, limit button. */}
					{renderPagination().map(_page => {
						return (
							<button
								className={page === _page ? "btn-pagination active" : "btn-pagination"}
								onClick={() => {
									if (page === _page) {
										return
									}
									setPage(curr => curr - curr + _page)
								}}
								key={_page}>
								{_page + 1}
							</button>
						)
					})}
				</div>
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
