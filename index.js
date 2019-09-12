const express = require('express');
const app = express();
const http = require('http').createServer(app);
const showdown = require('showdown');
const converter = new showdown.Converter();

converter.setFlavor('github')

const PORT = process.env.PORT || 3000;

// Configure App
app.io = require('socket.io')(http);
app.logger = require('./modules/logger');
app.use(express.json());


// Configure Socket.IO

app.io.on('connection', socket => {
	app.logger.info('Socket Connected', { id: socket.id });

	socket.on('convert markdown', params => {
		socket.emit('convert markdown', { html: converter.makeHtml(params.markdown) });
	});

});

// Main Route
app.use('/', express.static('./public'));

app.post('/test', (req, res) => {
	res.send(converter.makeHtml(req.body.text));
});

// Setup listening port
http.listen(PORT, () => {
	app.logger.info(`Express app started on port ${PORT}`, { port: PORT })
});