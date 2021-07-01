const MoviesList = ({ movies, onClick, setMovieId, title, type }) => {
	const handleClick = id => {
		onClick()
		window.location.hash = "#modal-title"
		setMovieId(() => id)
	}

	const renderMoviesList = () => {
		if (movies) {
			return movies.map(movie => {
				return (
					<div className='movie' data-imdbid={movie.id} key={movie.id}>
						<div className='card-layer' onClick={() => handleClick(movie.id)}></div>
						{movie.poster_path ? (
							<img
								className='poster'
								src={
									type
										? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
										: `https://image.tmdb.org/t/p/w400/${movie.poster_path}`
								}
								alt={`${movie.title} ${
									movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""
								} Poster`}
								onClick={() => handleClick(movie.id)}
							/>
						) : (
							<div className='poster error' onClick={() => handleClick(movie.id)}>
								<img
									className='poster'
									src='/Oops! 404 Error with a broken robot-rafiki.svg'
									alt='Oops! 404 Error with a broken robot-rafiki'
								/>
								<a
									className='attribution'
									href='https://storyset.com/web'
									target='_blank'
									rel='noreferrer'>
									Web illustrations
									<br /> by Storyset
								</a>
							</div>
						)}
						<p className={type ? `title ${type}` : "title"} onClick={() => handleClick(movie.id)}>
							{type
								? movie.title.length > 10
									? `${movie.title.slice(0, 20)}...`
									: `${movie.title} ${
											movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""
									  }`
								: movie.title.length > 20
								? `${movie.title.slice(0, 30)}...`
								: `${movie.title} ${
										movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""
								  }`}
						</p>
					</div>
				)
			})
		}
		return ""
	}
	return (
		<>
			{movies.length ? (
				<div className={type ? `movies-list ${type}` : "movies-list"}>{renderMoviesList()}</div>
			) : !title ? (
				""
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
