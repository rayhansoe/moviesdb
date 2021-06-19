const MoviesList = ({ movies }) => {
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
	return <div className='movies-list'>{renderMoviesList()}</div>
}

export default MoviesList
