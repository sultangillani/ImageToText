const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {handleRenderimageToText,handleRenderHomePage,deleteImageByName,deleteImageByNameForm} = require('../controllers/image_to_text');

router.get('/', handleRenderHomePage);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // Folder to save
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/convert',upload.single('image_item'), handleRenderimageToText);
router.get('/delete/:imageName', deleteImageByName);
router.post('/delete', deleteImageByNameForm);

const fs = require('fs');
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
//router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;