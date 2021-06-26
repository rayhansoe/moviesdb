import { handleError, handleResponse } from "./apiUtils"
let baseUrl
let movieID
let Trailers

export const getMovie = async imdbID => {
	if (imdbID) {
		baseUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=41eec44f`
		try {
			const response = await fetch(baseUrl)
			return handleResponse(response)
		} catch (error) {
			return handleError(error)
		}
	}
}

export const getMovieByImdbID = async imdbID => {
	if (imdbID) {
		baseUrl = `https://api.themoviedb.org/3/find/${imdbID}?api_key=f363fbafab56237920b96af2c295f5e1&external_source=imdb_id`
		try {
			const response = await fetch(baseUrl)
			return handleResponse(response)
		} catch (error) {
			return handleError(error)
		}
	}
}

export const getMovieVideos = async imdbID => {
	if (imdbID) {
		movieID = await getMovieByImdbID(imdbID).then(res => res.movie_results[0]?.id)
		if (movieID) {
			baseUrl = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=f363fbafab56237920b96af2c295f5e1&language=en-US`
			try {
				const response = await fetch(baseUrl)
				return handleResponse(response)
			} catch (error) {
				return handleError(error)
			}
		}
	}
	return
}

export const getMovieTrailers = async imdbID => {
	if (imdbID) {
		Trailers = await getMovieVideos(imdbID).then(res => res?.results)
		Trailers = Trailers.filter(vid => vid.type === "Trailer")
		return Trailers
	}
	return
}
