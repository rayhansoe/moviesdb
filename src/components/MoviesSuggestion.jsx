import React, { Suspense, lazy } from "react"
const MoviePreview = lazy(() => import("./MoviePreview"))

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
	onClick,
	setImdbID,
}) => {
	return (
		<ul className={moviesSuggestion.length && isActive ? "search-preview show" : "search-preview"}>
			{moviesSuggestion.slice(0, 2).map(m => {
				return (
					<li className='movie-card' key={m.id}>
						<Suspense fallback={<h1>Loading.... </h1>}>
							<MoviePreview
								id={m.id}
								preMovie={preMovie}
								setPreMovie={setPreMovie}
								movie={movie}
								onClick={onClick}
								setImdbID={setImdbID}
							/>
						</Suspense>
					</li>
				)
			})}
			{!moviesSuggestion.length ? null : (
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
			)}
		</ul>
	)
}

export default MoviesSuggestion
