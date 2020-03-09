const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/carapiproject');

const app = express();

// Routes locations
const users = require('./routes/users');

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users', users);

//Catch 404 and pass to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//Error handler
app.use((err, req, res, next) => {
	const error = app.get('env') === 'development' ? err : {};
	const status = err.status || 500;

	//Respong to client
	res.status(status).json({
		error : {
			message : error.message
		}
	});

	//Respond to server
	console.log(err);
});

//Start the server
const port = app.get('port') || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
