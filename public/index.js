const socket = io('/');

socket.on('connect', () => {
	console.log(`Socket.io connected with id ${socket.id}`);
});

socket.on('convert markdown', params => {
	console.log('Markdown Received!', params);

	const display = document.querySelector('.app-content__display');
	display.innerHTML = params.html;
});

// socket.emit('convert markdown', { markdown: '# Yay Socket.IO!'});

function debounce (fn) {
	var timer;

	// Return a function to run debounced
	return function () {

		// Setup the arguments
		var context = this;
		var args = arguments;

		// If there's a timer, cancel it
		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}

		// Setup the new requestAnimationFrame()
		timeout = window.requestAnimationFrame(function () {
			fn.apply(context, args);
		});

	}
}

const input = document.querySelector('.input');
console.log(input);
input.addEventListener('input', e => {
	if (socket.id) {
		socket.emit('convert markdown', { markdown: e.target.value });
	}
}, false);