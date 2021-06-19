const SearchResultsDetails = ({ title, totalResults }) => {
	const renderSearchResultsDetails = () => {
		return (
			title &&
			totalResults.length !== 0 && (
				<>
					<h1 className='title'>{title}</h1>

					<p>
						Explore <span>{totalResults}</span> movie information, all movie content and movie
						images from OMDb API.
					</p>
				</>
			)
		)
	}

	return <div className='search-results-details'>{renderSearchResultsDetails()}</div>
}

export default SearchResultsDetails
