const express = require('express');
const GifCommentController = require('../controllers/gifComment.controller');

const router = express.Router();

router.post('/:gifId/comment', GifCommentController.writeComment);

module.exports = router;