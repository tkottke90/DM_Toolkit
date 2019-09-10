const express = require('express');
const app = express();
const server = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

// Configure App
app.io = require('socket.io')(server);
app.logger = require('./modules/logger');
app.use(express.json());

app.io.on('connection', socket => {
	logger.info('Socket Connected', { ...socket });
});

// Main Route
app.use('/', express.static('./public'));

// Setup listening port
app.listen(PORT, () => {
	app.logger.info(`Express app started on port ${PORT}`, { port: PORT })
});