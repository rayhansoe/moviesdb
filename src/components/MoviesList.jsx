const MoviesList = ({ movies, onClick, setImdbID }) => {
	const handleClick = id => {
		onClick()
		setImdbID(() => id)
	}

	const renderMoviesList = () => {
		if (movies) {
			return movies.map(movie => {
				return (
					<div className='movie' data-imdbid={movie.id} key={movie.id}>
						<div className='card-layer' onClick={() => handleClick(movie.id)}></div>
						<img
							className='poster'
							src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
							alt={`${movie.title} (${movie.release_date.slice(0, 4)}) Poster`}
							onClick={() => handleClick(movie.id)}
						/>
						<p className='title' onClick={() => handleClick(movie.id)}>{`${
							movie.title
						} (${movie.release_date.slice(0, 4)})`}</p>
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
