import { delays } from "../tools/delays"
import React, { useMemo } from "react"

const SearchBox = ({ onChange, setTitle, preTitle }) => {
	const delay = useMemo(
		() => delays(() => setTitle(() => preTitle.current), 1000),
		[preTitle, setTitle]
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
