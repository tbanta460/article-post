const Article = require('./article/index.js');
const Controllers = {};

Controllers["getAllArticles"] = Article.getAllArticles;
Controllers['getArticles'] = Article.getArticles
Controllers["createArticle"] = Article.createArticle;
Controllers["getArticleById"] = Article.getArticleById;
Controllers["updateArticle"] = Article.updateArticle;
Controllers["deleteArticle"] = Article.deleteArticle;

module.exports = Controllers