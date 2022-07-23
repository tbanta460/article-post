const express = require('express');
const router = express.Router();
const {getAllArticles, getArticles, createArticle, getArticleById, updateArticle, deleteArticle} = require('../controllers/index.js');

router.get('/allarticles', getAllArticles);
router.get('/articles', getArticles)
router.get('/article/:id',getArticleById);
router.post('/article', createArticle);
router.put('/article/:id', updateArticle);
router.delete('/article/:id', deleteArticle);


module.exports = router