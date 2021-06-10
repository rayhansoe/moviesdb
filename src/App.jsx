/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css"

function App() {
	return (
		<>
			<div className='container'>
				<header className='nav-bg'>
					<nav className='navbar'>
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
					</nav>
				</header>
				<div className='separator'></div>
				<input type='text' className='search-box' />
				<h1 className='title'>Avengers</h1>
			</div>
		</>
	)
}

export default App
