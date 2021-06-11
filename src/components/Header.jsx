/* eslint-disable jsx-a11y/anchor-is-valid */
const Header = () => {
	return (
		<nav className='navBg'>
			<div className='navbar'>
				<h1 className='logo'>MoviesDB</h1>
				<ul className='menu'>
					<li>
						<a href='#' className='active'>
							Search Movie
						</a>
					</li>
					<li>
						<a href='#'>Top IMDb</a>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Header
