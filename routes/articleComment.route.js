const express = require('express');
const ArticleCommentController = require('../controllers/articleComment.controller');

const router = express.Router();

router.post('/:articleId/comment', ArticleCommentController.writeComment);

module.exports = router;