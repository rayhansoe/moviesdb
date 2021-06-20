import React, { Suspense, lazy } from "react"
const MovieDetail = lazy(() => import("./MovieDetail"))

const MoviesSuggestion = ({
	isActive,
	moviesSuggestion,
	preMovie,
	preTitle,
	movie,
	setPreMovie,
	setMovies,
	setTitle,
	setIsActive,
	setPage,
	refMoviesSuggestion,
}) => {
	return (
		isActive && (
			<ul className={moviesSuggestion.length ? "search-preview show" : "search-preview"}>
				{moviesSuggestion.slice(0, 2).map(m => {
					return (
						<li className='movie-card' key={m.imdbID}>
							<Suspense fallback={<h1>Loading.... </h1>}>
								<MovieDetail
									id={m.imdbID}
									preMovie={preMovie}
									setPreMovie={setPreMovie}
									movie={movie}
								/>
							</Suspense>
						</li>
					)
				})}
				<li className='cta' key='cta'>
					<h4
						onClick={e => {
							setMovies(() => refMoviesSuggestion.current)
							setTitle(() => preTitle)
							setIsActive(() => false)
							setPage(currentPage => currentPage - currentPage)
						}}>
						Lihat Lebih Banyak...
					</h4>
				</li>
			</ul>
		)
	)
}

export default MoviesSuggestion
