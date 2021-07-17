require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const morgan = require('morgan');
const db = require('./config/database');
const http = require('http');


const app = express();


app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/test', routes)

app.use('/api', routes);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({
		message: err.message,
	});
})


app.listen(process.env.PORT || 5001, () => {
	console.log(`Listening on port`, process.env.PORT);
	db.sync()
		.then(()=> console.log('Connected to DB', process.env.DB))
		.catch(err => console.log(err));
})