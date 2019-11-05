const express = require('express');
const GenreController = require('../controllers/genre.controller');

const router = express.Router();

router.get('/', GenreController.getAllGenres);
router.get('/:id', GenreController.getSingleGenre);
router.post('/', GenreController.createSingleGenre);
router.put('/:id', GenreController.updateSingleGenre);
router.delete('/:id', GenreController.deleteSingleGenre);

module.exports = router;