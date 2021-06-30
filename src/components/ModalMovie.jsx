import { createPortal } from "react-dom"
import React, { useMemo, useEffect, useRef, useState } from "react"
import { getMovieTrailers, getMovieById } from "../tools/MovieApi"

const ModalMovie = ({ open, onClose, movieId }) => {
	const [movie, setMovie] = useState(() => {})
	const [movieTrailers, setMovieTrailers] = useState(() => {})
	const refMovieTrailers = useRef(() => null)

	const getMovieVideos = useMemo(() => getMovieTrailers, [])
	const getMovie = useMemo(() => getMovieById, [])

	useEffect(() => {
		if (open) {
			getMovieVideos(movieId).then(res => {
				if (res) {
					refMovieTrailers.current = res
					setMovieTrailers(
						() => `https://www.youtube.com/embed/${refMovieTrailers?.current[0]?.key}`
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
		}
		return
	}, [getMovie, getMovieVideos, movieId, open, refMovieTrailers])

	const handleClose = () => {
		refMovieTrailers.current = []
		setMovie(() => {})
		setMovieTrailers(() => [])
		onClose()
	}

	return createPortal(
		<>
			{movie && (
				<div className={open ? "modal-movie visible" : "modal-movie"}>
					<div className='layer' onClick={handleClose}></div>
					<div className='modal-content'>
						<div className='container'>
							<div className='title'>{movie.title}</div>
							{/* need to fix CORS or something... */}
							<iframe
								width='1080'
								height='620'
								title='avengers'
								src={movieTrailers}
								allowFullScreen></iframe>
						</div>
					</div>
				</div>
			)}
		</>,
		document.getElementById("portal")
	)
}

export default ModalMovie
