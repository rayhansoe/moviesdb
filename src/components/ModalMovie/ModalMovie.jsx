import { createPortal } from "react-dom"
import React, { useMemo, useEffect, useRef, useState, lazy } from "react"
import { MovieTrailers, MovieById, MovieCredits, MovieRecommandations } from "../../tools/MovieApi"
const MoviesList = lazy(() => import("../MoviesList/MoviesList"))

const ModalMovie = ({ open, onClose, movieId, onClick, setMovieId }) => {
	const [movie, setMovie] = useState(() => {})
	const [casts, setCasts] = useState(() => [])
	const [crews, setCrews] = useState(() => [])
	const [movieTrailers, setMovieTrailers] = useState(() => {})
	const [movieRecommandations, setMovieRecommandations] = useState(() => [])

	const refMovieTrailers = useRef(() => null)

	const getMovie = useMemo(() => MovieById, [])
	const getMovieVideos = useMemo(() => MovieTrailers, [])
	const getMovieCredits = useMemo(() => MovieCredits, [])
	const getMovieRecommandations = useMemo(() => MovieRecommandations, [])

	useEffect(() => {
		if (open) {
			getMovieVideos(movieId).then(res => {
				if (res) {
					refMovieTrailers.current = res
					setMovieTrailers(() =>
						refMovieTrailers?.current[0]?.key
							? `https://www.youtube.com/embed/${refMovieTrailers?.current[0]?.key}`
							: null
					)
				}
				return
			})

			getMovie(movieId).then(res => {
				if (res) {
					setMovie(() => res)
				}
				return
			})

			getMovieCredits(movieId).then(res => {
				if (res) {
					setCasts(() => res.cast)
					setCrews(() => res.crew)
				}
				return
			})

			getMovieRecommandations(movieId).then(res => {
				if (res) {
					setMovieRecommandations(() => res.results.slice(0, 4))
				}
			})
		}
		return
	}, [
		getMovie,
		getMovieCredits,
		getMovieRecommandations,
		getMovieVideos,
		movieId,
		open,
		refMovieTrailers,
	])

	const handleClose = () => {
		refMovieTrailers.current = []
		setMovie(() => {})
		setMovieTrailers(() => [])
		onClose()
	}

	const renderTitle = () => {
		return `${movie.title} ${movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}`
	}

	const renderPlot = () => <p>{movie.overview || " "}</p>

	const renderGenres = () => {
		return movie.genres.length ? (
			<p>
				<span className='key'>{movie.genres.length > 1 ? "Genres" : "Genre"}</span>:{" "}
				{movie.genres.map(
					(genre, i, self) =>
						(
							<span key={genre.id}>
								{self.length - 1 === i ? `${genre.name}.` : `${genre.name}, `}
							</span>
						) || " "
				)}
			</p>
		) : (
			""
		)
	}

	const renderReleaseDate = () => {
		return movie.release_date ? (
			<p>
				<span className='key'>Release</span>: {movie.release_date || " "}
			</p>
		) : (
			""
		)
	}

	const renderDirectors = () => {
		return crews.filter(crew => crew.job === "Director").length ? (
			<p>
				<span className='key'>
					{crews.filter(crew => crew.job === "Director").length > 1 ? "Directors" : "Director"}
				</span>
				:{" "}
				{crews
					.filter(crew => crew.job === "Director")
					.map(
						(crew, i, self) =>
							(
								<span key={crew.id}>
									{self.length - 1 === i ? `${crew.name}.` : `${crew.name}, `}
								</span>
							) || " "
					)}
			</p>
		) : (
			""
		)
	}

	const renderWriters = () => {
		return crews.filter(
			(crew, i, self) =>
				crew.known_for_department === "Writing" &&
				i === self.findIndex(_crew => _crew.id === crew.id)
		).length ? (
			<p>
				<span className='key'>
					{crews.filter(
						(crew, i, self) =>
							crew.known_for_department === "Writing" &&
							i === self.findIndex(_crew => _crew.id === crew.id)
					).length > 1
						? "Writers"
						: "Writer"}
				</span>
				:{" "}
				{crews.filter(
					(crew, i, self) =>
						crew.known_for_department === "Writing" &&
						i === self.findIndex(_crew => _crew.id === crew.id)
				).length > 2
					? crews
							.filter(
								(crew, i, self) =>
									crew.known_for_department === "Writing" &&
									i === self.findIndex(_crew => _crew.id === crew.id)
							)
							.slice(0, 2)
							.map(
								(crew, i, self) =>
									(
										<span key={crew.id}>
											{self.length - 1 === i ? (
												<>
													{`${crew.name} (${crew.job}) |`}{" "}
													<span className='cta'>
														{`${
															crews.filter(
																(crew, i, self) =>
																	crew.known_for_department === "Writing" &&
																	i === self.findIndex(_crew => _crew.id === crew.id)
															).length - 2
														} more credits.`}
													</span>
												</>
											) : (
												`${crew.name} (${crew.job}), `
											)}
										</span>
									) || " "
							)
					: crews
							.filter(
								(crew, i, self) =>
									crew.known_for_department === "Writing" &&
									i === self.findIndex(_crew => _crew.id === crew.id)
							)
							.map(
								(crew, i, self) =>
									(
										<span key={crew.id}>
											{self.length - 1 === i
												? `${crew.name} (${crew.job}).`
												: `${crew.name} (${crew.job}), `}
										</span>
									) || " "
							)}
			</p>
		) : (
			""
		)
	}

	const renderStars = () => {
		return casts.length ? (
			<p>
				<span className='key'>Stars</span>:{" "}
				{casts.length > 5
					? casts.slice(0, 5).map(
							(cast, i, self) =>
								(
									<span key={cast.id}>
										{self.length - 1 === i ? (
											<>
												{`${cast.name} | `}
												<span className='cta'>{`Full casts & crews`}</span>
											</>
										) : (
											`${cast.name}, `
										)}
									</span>
								) || " "
					  )
					: casts.map(
							(cast, i, self) =>
								(
									<span key={cast.id}>
										{self.length - 1 === i ? `${cast.name}.` : `${cast.name}, `}
									</span>
								) || " "
					  )}
			</p>
		) : (
			""
		)
	}

	const renderTrailers = useMemo(
		() => () => {
			return movieTrailers ? (
				<iframe
					className='content'
					width='1080'
					height='620'
					title={movie ? movie.title : ""}
					src={movieTrailers}
					allowFullScreen></iframe>
			) : (
				""
			)
		},
		[movie, movieTrailers]
	)

	const renderMovieRecommandations = useMemo(
		() => () => {
			return movieRecommandations.length ? (
				<div className='movie-recommandations'>
					<h3>Recommandations</h3>
					<MoviesList
						movies={movieRecommandations}
						onClick={onClick}
						setMovieId={setMovieId}
						type='recommandations'
					/>
				</div>
			) : (
				""
			)
		},
		[movieRecommandations, onClick, setMovieId]
	)

	return createPortal(
		<>
			{movie && (
				<div className={open ? "modal-movie visible" : "modal-movie"}>
					<div className='layer' onClick={handleClose}></div>
					<div className='modal-content'>
						<div id='modal-title' className='title'>
							{renderTitle()}
						</div>
						{/* need to fix CORS or something... */}
						{renderTrailers()}
						<div className='movie-details'>
							{renderPlot()}
							{renderGenres()}
							{renderReleaseDate()}
							{renderDirectors()}
							{renderWriters()}
							{renderStars()}
						</div>
						{renderMovieRecommandations()}
					</div>
				</div>
			)}
		</>,
		document.getElementById("portal")
	)
}

export default ModalMovie
