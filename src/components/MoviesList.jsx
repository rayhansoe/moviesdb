const MoviesList = ({ movies, onClick, setImdbID }) => {
	const handleClick = id => {
		onClick()
		setImdbID(() => id)
	}

	const renderMoviesList = () => {
		if (movies) {
			return movies.map(movie => {
				return (
					<div className='movie' data-imdbid={movie.imdbID} key={movie.imdbID}>
						<div className='card-layer' onClick={() => handleClick(movie.imdbID)}></div>
						<img
							src={movie.Poster}
							alt={`${movie.Title} (${movie.Year}) Poster`}
							onClick={() => handleClick(movie.imdbID)}
						/>
						<p
							className='title'
							onClick={() => handleClick(movie.imdbID)}>{`${movie.Title} (${movie.Year})`}</p>
					</div>
				)
			})
		}
		return ""
	}
	return (
		<>
			{movies ? (
				<div className='movies-list'>{renderMoviesList()}</div>
			) : (
				<div className='fallback'>
					<img className='Error' src='/404 Error-bro.svg' alt='svg' />
					<a
						className='attribution'
						href='https://storyset.com/web'
						target='_blank'
						rel='noreferrer'>
						Web illustrations by Storyset
					</a>
				</div>
			)}
		</>
	)
}

export default MoviesList
