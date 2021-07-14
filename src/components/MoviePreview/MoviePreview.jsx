import React, { useEffect, useMemo, useState, useRef } from "react"
import { MovieById } from "../../tools/MovieApi"

const MoviePreview = ({ id, movie, onClick, setMovieId }) => {
	const [preMovie, setPreMovie] = useState(() => {})
	const cardLayer = useRef(null)
	const movieTitle = useRef(null)
	const getMovieApi = useMemo(() => MovieById, [])

	useEffect(() => {
		getMovieApi(id).then(res => {
			if (res) {
				movie.current = res
				setPreMovie(() => movie.current)
			}
		})

		return
	}, [getMovieApi, id, movie, setPreMovie])

	const handleClick = id => {
		onClick()
		setMovieId(id)
	}

	return preMovie ? (
		<>
			<img
				src={
					preMovie.poster_path
						? `https://image.tmdb.org/t/p/w200/${preMovie.poster_path}`
						: "/moviesdb/404 Error-bro.svg"
				}
				data-id={preMovie.id}
				alt={`${preMovie.title} (${preMovie.release_date.slice(0, 4)}) poster`}
				className='poster'
				onClick={() => handleClick(preMovie.id)}
			/>
			<div className='detail'>
				<h3
					className='movie-title'
					ref={movieTitle}
					data-id={preMovie.id}
					onClick={() => handleClick(preMovie.id)}>
					{`${preMovie.title} ${movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}`}
				</h3>
				<div className='sec1' onClick={() => handleClick(preMovie.id)} data-id={preMovie.id}>
					<p>
						imdb: <span className='rating'>{preMovie.vote_average}</span>
					</p>
					<p>
						{preMovie.genres.map(genre => {
							return <span key={genre.id}>{`${genre.name} `}</span>
						})}
					</p>
				</div>
				<p className='duration'>{preMovie.runtime} min</p>
			</div>
			<div
				className='card-layer'
				data-id={preMovie.id}
				ref={cardLayer}
				onClick={() => handleClick(preMovie.id)}></div>
		</>
	) : null
}

export default MoviePreview
