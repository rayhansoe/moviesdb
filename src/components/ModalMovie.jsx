import { createPortal } from "react-dom"
import React, { useMemo, useEffect, useRef, useState } from "react"
import { getMovieTrailers } from "../tools/MovieApi"

const ModalMovie = ({ open, onClose, imdbID }) => {
	const [movie, setMovie] = useState(() => {})
	const movieTrailers = useRef(() => null)

	// const getMovieAPI = useMemo(() => getMovieByID, [])
	const getMovieAPI = useMemo(() => getMovieTrailers, [])

	useEffect(() => {
		if (imdbID) {
			getMovieAPI(imdbID).then(res => {
				if (res) {
					movieTrailers.current = res
					setMovie(() => `https://www.youtube.com/embed/${movieTrailers?.current[0]?.key}`)
				}
				return
			})
		}
		return
		// console.log(getMovieAPI(imdbID))
	}, [getMovieAPI, imdbID, movieTrailers])

	return createPortal(
		<>
			<div className={open ? "modal-movie visible" : "modal-movie"}>
				<div className='layer' onClick={onClose}></div>
				<div className='modal-content'>
					<div className='container'>
						{/* need to fix CORS or something... */}
						<iframe width='1080' height='620' title='avengers' src={movie} allowFullScreen></iframe>
					</div>
				</div>
			</div>
		</>,
		document.getElementById("portal")
	)
}

export default ModalMovie
