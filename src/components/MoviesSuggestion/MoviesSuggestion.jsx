import React, { Suspense, lazy } from "react"
const MoviePreview = lazy(() => import("../MoviePreview/MoviePreview"))

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
	setMovieId,
}) => {
	const renderMoviesPreview = () => {
		return moviesSuggestion.slice(0, 2).map((m, i, self) => {
			return (
				<li
					className='movie-card'
					style={{
						borderTopRightRadius: self.length - 1 === i ? "" : "10px",
						borderTopLeftRadius: self.length - 1 === i ? "" : "10px",
					}}
					key={m.id}>
					<Suspense fallback={<h1>Loading.... </h1>}>
						<MoviePreview
							id={m.id}
							preMovie={preMovie}
							setPreMovie={setPreMovie}
							movie={movie}
							onClick={onClick}
							setMovieId={setMovieId}
						/>
					</Suspense>
				</li>
			)
		})
	}

	const handleClick = () => {
		setMovies(() => refMoviesSuggestion.current)
		setTitle(() => preTitle)
		setIsActive(() => false)
		setPage(currentPage => currentPage - currentPage)
	}

	return (
		<ul className={moviesSuggestion.length && isActive ? "search-preview show" : "search-preview"}>
			{renderMoviesPreview()}
			{!moviesSuggestion.length ? null : (
				<li className='cta' key='cta'>
					<h4 onClick={handleClick}>Lihat Lebih Banyak...</h4>
				</li>
			)}
		</ul>
	)
}

export default MoviesSuggestion
