import { delays } from "../tools/delays"
import React, { useMemo, useState, useRef, useEffect, lazy } from "react"
import { handleError, handleResponse } from "../tools/apiUtils"
const MovieDetail = lazy(() => import("./MovieDetail"))

const SearchBox = ({
	onChange,
	setTitle,
	_title,
	title,
	setPage,
	page,
	setMovies,
	prevMovies,
	previewMovies,
	setPreviewMovies,
}) => {
	const [preTitle, setPreTitle] = useState(() => "")
	const [preMovie, setPreMovie] = useState(() => {})

	const url = useRef(() => "")
	const myInput = useRef(() => null)
	const myPreview = useRef(() => null)
	const movie = useRef(() => {})

	const fetchResponse = useMemo(() => handleResponse, [])
	const fetchError = useMemo(() => handleError, [])
	const delay = useMemo(
		() =>
			// ini harus di revisi lagi, pengkondisian dengan delay yang berbeda.
			delays(() => {
				if (_title.current !== title && _title.current !== preTitle) {
					setPreTitle(() => _title.current)
				} else if (_title.current === title && _title.current === preTitle) {
					setPreTitle(() => _title.current)
				}
			}, 1500),
		[_title, preTitle, title]
	)

	useEffect(() => {
		if (title.length !== 0 && preTitle === title) {
			url.current = `https://www.omdbapi.com/?s=${preTitle}&apikey=41eec44f&page=${page}`
			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					prevMovies.current = []
				} else {
					prevMovies.current = data.Search
					setMovies(() => prevMovies.current)
				}
			})
		} else if (preTitle.length !== 0 && title !== preTitle) {
			console.log(_title.current)
			console.log(preTitle)
			console.log(title)
			url.current = `https://www.omdbapi.com/?s=${preTitle}&apikey=41eec44f`

			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					prevMovies.current = []
				} else {
					prevMovies.current = data.Search
					setPreviewMovies(() => prevMovies.current)
				}
			})
		} else if (_title.current === title && _title.current === preTitle && title === preTitle) {
			console.log(_title.current)
			console.log(preTitle)
			console.log(title)
			url.current = `https://www.omdbapi.com/?s=${preTitle}&apikey=41eec44f`

			let a = fetch(url.current)
			a = a.then(fetchResponse).catch(fetchError)
			a.then(data => {
				if (data.Error) {
					prevMovies.current = []
				} else {
					prevMovies.current = data.Search
					setPreviewMovies(() => prevMovies.current)
				}
			})
		} else if (_title.length === 0 && preTitle.length === 0) {
			prevMovies.current = []
			setTitle(() => "")
		}
	}, [
		_title,
		fetchError,
		fetchResponse,
		page,
		preTitle,
		prevMovies,
		setMovies,
		setPreviewMovies,
		setTitle,
		title,
	])

	const renderSuggestions = () => {
		if (previewMovies.length === 0) {
			return null
		}
		return (
			<ul className='search-preview show' ref={myPreview}>
				{previewMovies.slice(0, 2).map(m => {
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
							setMovies(() => prevMovies.current)
							setTitle(() => preTitle)
							setPreviewMovies(() => [])
							setPage(currentPage => currentPage - currentPage + 1)
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
							setTitle(() => _title.current)
							setPreTitle(() => _title.current)
							setPage(() => 1)
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
