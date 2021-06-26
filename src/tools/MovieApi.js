import { handleError, handleResponse } from "./apiUtils"
let baseUrl

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
