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

	const handleClick = e => {
		if (e.target === myContainer.current) {
			setMoviesSuggestion(() => [])
		}
	}

	const getArrPagination = () => {
		let arr = []
		if (totalResults) {
			for (let i = 0; i < Math.ceil(totalResults / 10); i++) {
				arr.push(i)
			}
		}
		return arr
	}

	const renderPagination = () => {
		if (Math.ceil(totalResults / 10) > 20) {
			return (
				<div className='dropdown-pagination'>
					<p>Page: </p>
					<select
						name='page'
						className='dropdown'
						onChange={e => {
							if (page === parseInt(e.target.value)) {
								return
							}
							setPage(curr => curr - curr + parseInt(e.target.value))
						}}>
						{getArrPagination().map(_page => {
							return (
								<option value={_page} key={_page}>
									{_page + 1}
								</option>
							)
						})}
					</select>
					<p> of {Math.ceil(totalResults / 10)}</p>
				</div>
			)
		}
		return getArrPagination().map(_page => {
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
		})
	}

	const renderSearchResultsDetails = () => {
		return (
			title && (
				<>
					<h1 className='title'>{title}</h1>

					<p>
						Explore <span>{totalResults}</span> movie information, all movie content and movie
						images from OMDb API.
					</p>
				</>
			)
		)
	}

	const renderMoviesList = () => {
		return (
			movies.length !== 0 &&
			movies.map(movie => {
				return (
					<div className='movie' key={movie.imdbID}>
						<img src={movie.Poster} alt='' />
						<p className='title'>{`${movie.Title} (${movie.Year})`}</p>
					</div>
				)
			})
		)
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
				<div className='search-results-details'>{renderSearchResultsDetails()}</div>
				{/* need to fix movies-list fail fetch*/}
				<div className='movies-list'>{renderMoviesList()}</div>
				<div className='separator' style={{ backgroundColor: "#ffffff" }}></div>
				<div className='pagination'>{renderPagination()}</div>
				{renderSeparators()}
			</div>
		</>
	)
}

export default App
