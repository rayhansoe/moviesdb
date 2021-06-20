import React, { useEffect, useMemo, useState } from "react"
import { getMovie } from "../tools/MovieApi"

const MovieDetail = ({ id, movie }) => {
	const [preMovie, setPreMovie] = useState(() => {})
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

	return preMovie ? (
		<>
			<img src={preMovie.Poster} alt='' className='poster' />
			<div className='detail'>
				<h3 className='movie-title'>{`${preMovie.Title} (${preMovie.Year})`}</h3>
				<div className='sec1'>
					<p className='imdb'>
						imdb: <span>{preMovie.imdbRating}</span>
					</p>
					<p className='category'>{preMovie.Genre}</p>
				</div>
				<p className='duration'>{preMovie.Runtime}</p>
			</div>
		</>
	) : null
}

export default MovieDetail
