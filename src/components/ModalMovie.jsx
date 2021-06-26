import { createPortal } from "react-dom"

const ModalMovie = ({ open, onClose, movie }) => {
	return createPortal(
		<>
			<div className={open ? "modal-movie visible" : "modal-movie"}>
				<div className='layer' onClick={onClose}></div>
				<div className='modal-content' onClick={() => console.log(movie)}>
					<div className='container'>
						<h1>Haiii</h1>
					</div>
				</div>
			</div>
		</>,
		document.getElementById("portal")
	)
}

export default ModalMovie
