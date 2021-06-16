import "./App.css"
import React, { lazy, useState, Suspense, useRef } from "react"
const Header = lazy(() => import("./components/Header"))
const SearchBox = lazy(() => import("./components/SearchBox"))

function App() {
	const [title, setTitle] = useState(() => "")
	const [movies, setMovies] = useState(() => [])
	const [page, setPage] = useState(() => 1)
	const _title = useRef(() => "")
	const [previewMovies, setPreviewMovies] = useState(() => [])
	const prevMovies = useRef(() => [])
	const myContainer = useRef(null)

	const handleChange = e => {
		_title.current = e
	}

	return (
		<>
			<div
				className='container'
				ref={myContainer}
				onClick={e => {
					if (e.target === myContainer.current) {
						setPreviewMovies(() => [])
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
						_title={_title}
						title={title}
						setPage={setPage}
						page={page}
						setMovies={setMovies}
						previewMovies={previewMovies}
						setPreviewMovies={setPreviewMovies}
						prevMovies={prevMovies}
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
