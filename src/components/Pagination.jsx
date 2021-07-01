const Pagination = ({ totalPages, page, setPage }) => {
	const getArrPagination = () => {
		let arr = []
		if (totalPages) {
			for (let i = 0; i < totalPages; i++) {
				arr.push(i)
			}
		}
		return arr
	}

	const renderPagination = () => {
		if (totalPages > 20) {
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
							window.location.hash = "#title"
						}}>
						{getArrPagination().map(_page => {
							return (
								<option value={_page} key={_page}>
									{_page + 1}
								</option>
							)
						})}
					</select>
					<p> of {totalPages}</p>
				</div>
			)
		}
		return getArrPagination().map(_page => {
			return (
				<a
					href='#title'
					className={page === _page ? "btn-pagination active" : "btn-pagination"}
					onClick={() => {
						if (page === _page) {
							return
						}
						setPage(curr => curr - curr + _page)
					}}
					key={_page}>
					{_page + 1}
				</a>
			)
		})
	}

	return <div className='pagination'>{renderPagination()}</div>
}

export default Pagination
