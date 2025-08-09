const express = require('express');

const {connectMongoDb} = require('./connect');

//const urlRoute = require('./routes/');
const imageToText = require('./routes/image_to_text');
const app = express();

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const PORT = 8000;

const dbURI = 'mongodb://127.0.0.1:27017/image_to_text'; 

connectMongoDb(dbURI).then(() => console.log('MongoDB connected successfully!')).catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use( express.json() );
app.use( express.urlencoded({extended: false}) );

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', imageToText);


/*const URL = require('./models/url');

const dbURI = 'mongodb://127.0.0.1:27017/short-url'; 

connectMongoDb(dbURI).then(() => console.log('MongoDB connected successfully!')).catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use( express.json() );
app.use( express.urlencoded({extended: false}) );

app.use('/url', urlRoute);
app.use('/', staticRoute);

app.get('/url/:shortId', async (req, res) => {
	const shortId = req.params.shortId;
	const entry = await URL.findOneAndUpdate({ shortId }, {
		$push: {
			visitedHistory: {timestamp: Date.now() }
		}
	});
	
	res.redirect(entry.redirectURL);
});*/

app.listen(PORT,() => {
	console.log('Server Started');
});