const express = require('express');
const ArticleController = require('../controllers/article.controller');

const router = express.Router();

router.get('/', ArticleController.getAllArticles);
router.get('/:id', ArticleController.getSingleArticle);
router.post('/', ArticleController.createSingleArticle);
router.patch('/:id', ArticleController.updateSingleArticle);
router.delete('/:id', ArticleController.deleteSingleArticle);

module.exports = router;