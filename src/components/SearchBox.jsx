import { delays } from "../tools/delays"
import React, { useMemo, useRef, useEffect } from "react"
import { handleError, handleResponse } from "../tools/apiUtils"

const SearchBox = ({
	onChange,
	setTitle,
	refTitle,
	title,
	setPage,
	page,
	setMovies,
	refMoviesSuggestion,
	setMoviesSuggestion,
	setTotalResults,
	isActive,
	setIsActive,
	preTitle,
	setPreTitle,
}) => {
	const url = useRef(() => "")
	const myInput = useRef(() => null)

	const fetchResponse = useMemo(() => handleResponse, [])
	const fetchError = useMemo(() => handleError, [])
	const delay = useMemo(() => {
		if (refTitle.current === title && refTitle.current === preTitle) {
			delays(() => setPreTitle(() => refTitle.current), 0)
		}
		return delays(() => {
			if (refTitle.current.length) {
				setPreTitle(() => refTitle.current.trim())
			}
			return
		}, 1000)
	}, [refTitle, title, preTitle, setPreTitle])

	useEffect(() => {
		// Enter
		if (title.length !== 0 && preTitle === title && page === 0) {
			url.current = `https://api.themoviedb.org/3/search/movie?query=${preTitle}&api_key=f363fbafab56237920b96af2c295f5e1&page=${
				page + 1
			}`
			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					setTotalResults(curr => curr - curr)
					refMoviesSuggestion.current = []
					setMovies(curr => curr - curr)
					setMoviesSuggestion(() => [])
				} else {
					refMoviesSuggestion.current = data.results.filter(movie => movie.poster_path !== null)
					setMovies(() => refMoviesSuggestion.current)
					setMoviesSuggestion(() => refMoviesSuggestion.current)
					setTotalResults(curr => {
						if (curr === "") {
							return parseInt(curr + refMoviesSuggestion.current.length)
						} else {
							return parseInt(refMoviesSuggestion.current.length) + (curr - curr)
						}
					})
				}
			})
		} else if (title.length !== 0 && preTitle === title && page !== 0) {
			// Pagination
			url.current = `https://api.themoviedb.org/3/search/movie?query=${preTitle}&api_key=f363fbafab56237920b96af2c295f5e1&page=${
				page + 1
			}`
			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					setTotalResults(curr => curr - curr)
					refMoviesSuggestion.current = []
					setMovies(curr => curr - curr)
				} else {
					refMoviesSuggestion.current = data.results
					setMovies(() => refMoviesSuggestion.current)
				}
			})
		} else if (preTitle.length !== 0 && title !== preTitle) {
			// Search Suggestion
			url.current = `https://api.themoviedb.org/3/search/movie?query=${preTitle}&api_key=f363fbafab56237920b96af2c295f5e1`
			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					refMoviesSuggestion.current = []
					setMoviesSuggestion(() => [])
				} else {
					refMoviesSuggestion.current = data.results
					setMoviesSuggestion(() => refMoviesSuggestion.current)
					setIsActive(() => true)
				}
			})
		} else if (refTitle.current === title && refTitle.current === preTitle && title === preTitle) {
			url.current = `https://www.omdbapi.com/?s=${preTitle}&apikey=41eec44f&type=movie`
			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					refMoviesSuggestion.current = []
				} else {
					refMoviesSuggestion.current = data.Search
					setMoviesSuggestion(() => refMoviesSuggestion.current)
					setTotalResults(curr => {
						if (curr === "") {
							return parseInt(curr + data.totalResults)
						} else {
							return parseInt(data.totalResults) + (curr - curr)
						}
					})
				}
			})
		} else if (refTitle.length === 0 && preTitle.length === 0) {
			refMoviesSuggestion.current = []
			setTitle(() => "")
		}
	}, [
		refTitle,
		fetchError,
		fetchResponse,
		page,
		preTitle,
		refMoviesSuggestion,
		setMovies,
		setMoviesSuggestion,
		setTitle,
		title,
		setTotalResults,
		setIsActive,
	])

	const onFocus = () => setIsActive(() => true)

	return (
		<>
			{isActive && <div className='layer' onClick={() => setIsActive(() => false)}></div>}
			<div className='search-section' ref={myInput}>
				<input
					type='text'
					className='search-box'
					onChange={e => onChange(e.target.value)}
					onKeyDown={e => {
						if (e.key === "Enter" && e.target.value.length !== 0) {
							setTitle(() => refTitle.current.trim())
							setPreTitle(() => refTitle.current.trim())
							setPage(currentPage => currentPage - currentPage)
							// setMoviesSuggestion(curr => curr.splice(0, curr.length))
							setIsActive(() => false)
						}
					}}
					onFocus={onFocus}
					onKeyUp={delay}
					onClick={() => setIsActive(() => true)}
					placeholder={"Search..."}
				/>
			</div>
		</>
	)
}

export default SearchBox
