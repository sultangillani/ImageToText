const imageCollection = require('../models/image_to_text');
const Tesseract = require("tesseract.js");
const fs = require('fs');
const { createWorker } = Tesseract;
const path = require('path');

async function deleteProcessImage(imagePath) {
    try {
        const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
        console.log("Extracted text:", text);

        // Remove file after OCR
        fs.unlink(imagePath, (err) => {
            if (err) console.error("Error deleting file:", err);
            else console.log("Temporary file deleted");
        });

        return text;
    } catch (err) {
        console.error("Error processing image:", err);
    }
}

async function deleteImageByName(req,res) {
	const imageName = req.params.imageName
    try {
		const collectedImage = await imageCollection.findOne({ImageName: imageName});
		const collectedImagePath = await collectedImage.ImagePath;

        const deleted = await imageCollection.findOneAndDelete({ ImageName: imageName });

		deleteProcessImage(collectedImagePath);
        if (deleted) {
            console.log(`Deleted entry with ImageName: ${imageName}`);
        } else {
            console.log(`No entry found for ImageName: ${imageName}`);
        }
		
		return res.json({id: `Deleted entry with ImageName: ${imageName}`, collectedImagePath: collectedImagePath});
    } catch (err) {
        console.error("Error deleting entry:", err);
    }
}

async function handleRenderHomePage(req,res){
	const worker = await createWorker('eng', 1, {legacyCore: true, legacyLang: true});
	const imagePath = path.resolve(__dirname, '../uploads', '1754768821149.png');
	
	//const result = await imageCollection.deleteMany({});

	const allimageCollection = await imageCollection.find({});

    return res.render('home',{
		id: 0,
		allimages: allimageCollection
	});
}

async function handleRenderimageToText(req,res){
	const body = req.body;
	/*const shortId = shortid();
	if(!body.url){
		return res.status(404).json({error: 'URL is required.'});
	}
	await URL.create({
		shortId: shortId,
		redirectURL: body.url,
		visitedHistory: []
	});*/
	
	/*console.log(body);
	return res.render('home',{
		id: 0,
	});*/
	const filename = '../uploads/' + req.file.filename;
	const imagePath = path.join(__dirname, filename);
	let EText = '';
	
	await Tesseract.recognize(
		imagePath,
		"eng", // language
	{ logger: info => console.log(info) } // optional progress logs
	).then(({ data: { text } }) => {
		console.log("Extracted Text:");
		console.log(text);
		
		EText = text;
	}).catch(err => {
		console.error("Error:", err);
	});

	const fileUrl = `http://localhost:8000/uploads/${req.file.filename}`;

	await imageCollection.create({
		ImageName: req.file.filename,
		ImagePath: imagePath,
		ImageUrl: fileUrl,
		ImageText: EText
	});
	//return res.json({result: EText});

	const allimageCollection = await imageCollection.find({});
	return res.render('home',{
		image: fileUrl,
		text: EText,
		allimages: allimageCollection
	});

	//console.log("Uploaded file info:", req.file);
  	//res.send(`File uploaded: ${imagePath} <br /> Extracted Text: result: ${EText}`);

	//return res.json({id: 'Cool'});
}

module.exports = {
	handleRenderimageToText,
    handleRenderHomePage,
	deleteImageByName
};