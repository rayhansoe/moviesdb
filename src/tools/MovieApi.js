import { handleError, handleResponse } from "./apiUtils"
let baseUrl
let Trailers

export const MovieById = async id => {
	if (id) {
		baseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=f363fbafab56237920b96af2c295f5e1`
		try {
			const response = await fetch(baseUrl)
			return handleResponse(response)
		} catch (error) {
			return handleError(error)
		}
	}
}

export const MovieByImdbID = async imdbID => {
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

export const MovieVideos = async id => {
	if (id) {
		baseUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f363fbafab56237920b96af2c295f5e1&language=en-US`
		try {
			const response = await fetch(baseUrl)
			return handleResponse(response)
		} catch (error) {
			return handleError(error)
		}
	}
	return
}

export const MovieTrailers = async id => {
	if (id) {
		Trailers = await MovieVideos(id).then(res => res?.results)
		Trailers = Trailers.filter(vid => vid.type === "Trailer")
		return Trailers
	}
	return
}

export const MovieCredits = async id => {
	if (id) {
		baseUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f363fbafab56237920b96af2c295f5e1`
		try {
			const response = await fetch(baseUrl)
			return handleResponse(response)
		} catch (error) {
			return handleError(error)
		}
	}
	return
}
