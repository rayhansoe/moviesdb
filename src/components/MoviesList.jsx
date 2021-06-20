const MoviesList = ({ movies }) => {
	const renderMoviesList = () => {
		if (movies) {
			return movies.map(movie => {
				return (
					<div className='movie' key={movie.imdbID}>
						<img src={movie.Poster} alt='' />
						<p className='title'>{`${movie.Title} (${movie.Year})`}</p>
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
