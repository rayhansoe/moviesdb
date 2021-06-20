const SearchResultsDetails = ({ title, totalResults }) => {
	const renderSearchResultsDetails = () => {
		if (title && totalResults) {
			return (
				<>
					<h1 className='title'>{title}</h1>
					<p>
						Explore <span>{totalResults}</span> movie information, all movie content and movie
						images from OMDb API.
					</p>
				</>
			)
		} else if (title && totalResults === 0) {
			return (
				<>
					<h1 className='title'>{title}</h1>

					<p>
						We could not find anything for "sdadawdaw".
						<br />
						Search result: <span>{totalResults}</span>
					</p>
				</>
			)
		}
	}

	return (
		<div className='search-results-details' style={{ marginBottom: totalResults ? "60px" : "0px" }}>
			{renderSearchResultsDetails()}
		</div>
	)
}

export default SearchResultsDetails
