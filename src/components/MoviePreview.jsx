import React, { useEffect, useMemo, useState, useRef } from "react"
import { getMovie } from "../tools/MovieApi"

const MoviePreview = ({ id, movie }) => {
	const [preMovie, setPreMovie] = useState(() => {})
	const cardLayer = useRef(null)
	const movieTitle = useRef(null)
	const getMovieApi = useMemo(() => getMovie, [])

	useEffect(() => {
		getMovieApi(id).then(res => {
			if (res) {
				movie.current = res
				setPreMovie(() => movie.current)
			}
		})

		return
	}, [getMovieApi, id, movie, setPreMovie])

	const handleClick = () => console.log(cardLayer.current.dataset.imdbid)

	return preMovie ? (
		<>
			<img src={preMovie.Poster} alt='poster' className='poster' onClick={handleClick} />
			<div className='detail'>
				<h3 className='movie-title' ref={movieTitle} onClick={handleClick}>
					{`${preMovie.Title} (${preMovie.Year})`}{" "}
				</h3>
				<div className='sec1'>
					<p>
						imdb: <span>{preMovie.imdbRating}</span>
					</p>
					<p>{preMovie.Genre}</p>
				</div>
				<p className='duration'>{preMovie.Runtime}</p>
			</div>
			<div
				className='card-layer'
				data-imdbid={preMovie.imdbID}
				ref={cardLayer}
				onClick={handleClick}></div>
		</>
	) : null
}

export default MoviePreview
