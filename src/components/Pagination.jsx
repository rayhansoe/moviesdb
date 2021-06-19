const Pagination = ({ totalResults, page, setPage }) => {
	const getArrPagination = () => {
		let arr = []
		if (totalResults) {
			for (let i = 0; i < Math.ceil(totalResults / 10); i++) {
				arr.push(i)
			}
		}
		return arr
	}

	const renderPagination = () => {
		if (Math.ceil(totalResults / 10) > 20) {
			return (
				<div className='dropdown-pagination'>
					<p>Page: </p>
					<select
						name='page'
						className='dropdown'
						onChange={e => {
							if (page === parseInt(e.target.value)) {
								return
							}
							setPage(curr => curr - curr + parseInt(e.target.value))
						}}>
						{getArrPagination().map(_page => {
							return (
								<option value={_page} key={_page}>
									{_page + 1}
								</option>
							)
						})}
					</select>
					<p> of {Math.ceil(totalResults / 10)}</p>
				</div>
			)
		}
		return getArrPagination().map(_page => {
			return (
				<button
					className={page === _page ? "btn-pagination active" : "btn-pagination"}
					onClick={() => {
						if (page === _page) {
							return
						}
						setPage(curr => curr - curr + _page)
					}}
					key={_page}>
					{_page + 1}
				</button>
			)
		})
	}

	return <div className='pagination'>{renderPagination()}</div>
}

export default Pagination
