const mongoose = require('mongoose');

//Schema::
const imageCollectionSchema = new mongoose.Schema({
	ImageName: {
		type: String,
		required: true
	},
	ImagePath: {
		type: String,
		required: true
	},
	ImageUrl: {
		type: String,
		required: true
	},
	ImageText: {
		type: String,
		required: false,
	}
	
},{timestamps: true});

const imageCollection = mongoose.model('imageCollection',imageCollectionSchema);

module.exports = imageCollection;