const express = require('express');
const fileUpload = require('express-fileupload');
const GifController = require('../controllers/gif.contoller');

const router = express.Router();

router.use(fileUpload({
    useTempFiles: true
}));


router.post('/', GifController.postGif);
router.delete('/:gifId', GifController.deleteGif);



module.exports = router;


