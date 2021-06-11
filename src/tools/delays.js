export function delays(fn, ms) {
	let timer = 0
	return function (...args) {
		clearTimeout(timer)
		timer = setTimeout(fn.bind(this, ...args), ms || 0)
	}
}
