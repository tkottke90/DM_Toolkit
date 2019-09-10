const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.logger = require('./modules/logger');
app.use(express.json());



app.listen(PORT, () => {
	app.logger.info(`Express app started on port ${PORT}`, { port: PORT })
});