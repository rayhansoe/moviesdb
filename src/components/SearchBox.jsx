/* eslint-disable no-unused-vars */
import { delays } from "../tools/delays"
import React, { useMemo, useState, useRef } from "react"

const SearchBox = ({ onChange, setTitle, _title, title, setPage, page, setMovies, prevMovies }) => {
	const [preTitle, setPreTitle] = useState(() => "")
	const [focused, setFocused] = React.useState(false)
	const myInput = useRef(() => null)

	const delay = useMemo(
		() =>
			delays(() => {
				if (_title.current !== title) {
					setPage(prev => prev - prev + 1)
					setPreTitle(() => _title.current)
				}
			}, 1500),
		[_title, setPage, title]
	)

	const onFocus = () => setFocused(true)
	const onBlur = () => setFocused(false)

	return (
		<>
			<div>
				<input
					ref={myInput}
					type='text'
					className='search-box'
					onChange={e => onChange(e.target.value)}
					onKeyDown={e => {
						if (e.key === "Enter") {
							setTitle(() => _title.current)
							setPage(() => 1)
							// setMovies(pre => )
						}
					}}
					onKeyUp={delay}
					placeholder={"Search..."}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			</div>
			{focused ? (
				<div className={focused ? "search-preview show" : "search-preview"}>
					<div className='movie-card'>
						<img
							src='https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'
							alt=''
							className='poster'
						/>
						<div className='detail'>
							<h3 className='movie-title'>The Avengers (2012)</h3>
							<div className='sec1'>
								<p className='imdb'>
									imdb: <span>8.9</span>
								</p>
								<p className='category'>Comedy, Action, Sci-Fi, Advanture</p>
							</div>
							<p className='duration'>180 min</p>
						</div>
					</div>
					<div className='movie-card'>
						<img
							src='https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'
							alt=''
							className='poster'
						/>
						<div className='detail'>
							<h3 className='movie-title'>The Avengers (2012)</h3>
							<div className='sec1'>
								<p className='imdb'>
									imdb: <span>8.9</span>
								</p>
								<p className='category'>Comedy, Action, Sci-Fi, Advanture</p>
							</div>
							<p className='duration'>180 min</p>
						</div>
					</div>
					<div className='cta'>
						<h4>Lihat Lebih Banyak...</h4>
					</div>
				</div>
			) : (
				""
			)}
			{/* <h1>{focused ? url : ""}</h1> */}
		</>
	)
}

export default SearchBox
