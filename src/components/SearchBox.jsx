import { delays } from "../tools/delays"
import React, { useMemo, useState, useRef, useEffect, lazy } from "react"
import { handleError, handleResponse } from "../tools/apiUtils"
const MovieDetail = lazy(() => import("./MovieDetail"))

const SearchBox = ({
	onChange,
	setTitle,
	refTitle,
	title,
	setPage,
	page,
	setMovies,
	refMoviesSuggestion,
	moviesSuggestion,
	setMoviesSuggestion,
	setTotalResults,
}) => {
	const [preTitle, setPreTitle] = useState(() => "")
	const [preMovie, setPreMovie] = useState(() => {})

	const url = useRef(() => "")
	const myInput = useRef(() => null)
	const myPreview = useRef(() => null)
	const movie = useRef(() => {})

	const fetchResponse = useMemo(() => handleResponse, [])
	const fetchError = useMemo(() => handleError, [])
	const delay = useMemo(() => {
		if (refTitle.current === title && refTitle.current === preTitle) {
			delays(() => setPreTitle(() => refTitle.current), 0)
		}
		return delays(() => setPreTitle(() => refTitle.current), 1500)
	}, [refTitle, preTitle, title])

	useEffect(() => {
		if (title.length !== 0 && preTitle === title) {
			url.current = `https://www.omdbapi.com/?s=${preTitle}&apikey=41eec44f&page=${page + 1}`
			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					refMoviesSuggestion.current = []
				} else {
					refMoviesSuggestion.current = data.Search
					setMovies(() => refMoviesSuggestion.current)
					setTotalResults(curr => parseInt(data.totalResults) + (curr - curr))
				}
			})
		} else if (preTitle.length !== 0 && title !== preTitle) {
			url.current = `https://www.omdbapi.com/?s=${preTitle}&apikey=41eec44f`
			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					refMoviesSuggestion.current = []
				} else {
					refMoviesSuggestion.current = data.Search
					setMoviesSuggestion(() => refMoviesSuggestion.current)
				}
			})
		} else if (refTitle.current === title && refTitle.current === preTitle && title === preTitle) {
			url.current = `https://www.omdbapi.com/?s=${preTitle}&apikey=41eec44f`
			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					refMoviesSuggestion.current = []
				} else {
					refMoviesSuggestion.current = data.Search
					setMoviesSuggestion(() => refMoviesSuggestion.current)
					setTotalResults(curr => parseInt(data.totalResults) + (curr - curr))
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
	])

	const renderSuggestions = () => {
		if (moviesSuggestion.length === 0) {
			return null
		}
		return (
			<ul className='search-preview show' ref={myPreview}>
				{moviesSuggestion.slice(0, 2).map(m => {
					return (
						<li className='movie-card' key={m.imdbID}>
							<MovieDetail
								id={m.imdbID}
								preMovie={preMovie}
								setPreMovie={setPreMovie}
								movie={movie}
							/>
						</li>
					)
				})}
				<li className='cta' key='cta'>
					<h4
						onClick={e => {
							setMovies(() => refMoviesSuggestion.current)
							setTitle(() => preTitle)
							setMoviesSuggestion(() => [])
							setPage(currentPage => currentPage - currentPage)
						}}>
						Lihat Lebih Banyak...
					</h4>
				</li>
			</ul>
		)
	}

	return (
		<>
			<div className='search-section' ref={myInput}>
				<input
					type='text'
					className='search-box'
					onChange={e => onChange(e.target.value)}
					onKeyDown={e => {
						if (e.key === "Enter") {
							setTitle(() => refTitle.current)
							setPreTitle(() => refTitle.current)
							setPage(currentPage => currentPage - currentPage)
							setMoviesSuggestion(curr => curr.splice(0, curr.length))
						}
					}}
					onKeyUp={delay}
					placeholder={"Search..."}
				/>
				{renderSuggestions()}
			</div>
		</>
	)
}

export default SearchBox
