import { handleError, handleResponse } from "./apiUtils"
let baseUrl

export const getMovie = imdbID => {
	if (imdbID) {
		baseUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=41eec44f`
		return fetch(baseUrl).then(handleResponse).catch(handleError)
	}
}
