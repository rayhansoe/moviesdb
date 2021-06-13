import { delays } from "../tools/delays"
import React, { useMemo } from "react"

const SearchBox = ({ onChange, setTitle, _title, title, setPage }) => {
	const delay = useMemo(
		() =>
			delays(() => {
				if (_title.current !== title) {
					setTitle(() => _title.current)
					setPage(() => 1)
				}
				return
			}, 2500),
		[_title, setPage, setTitle, title]
	)

	return (
		<div>
			<input
				type='text'
				className='search-box'
				onChange={e => onChange(e.target.value)}
				onKeyUp={delay}
				placeholder={"Search..."}
			/>
		</div>
	)
}

export default SearchBox
