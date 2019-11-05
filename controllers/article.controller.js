require('../models/db/article')();
const db = require('../models/db/index');
const Joi = require('@hapi/joi');
const generateId = require('../logics/identity');

const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth()+1)}-${+today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;
class ArticleController {

    static async getAllArticles(req, res) {
        const articles = await db.query(`SELECT * FROM articles ORDER BY createdOn DESC`);
        res.status(200).json({
            status: 'Success',
            data: articles.rows
        });
    };


    static async getSingleArticle(req, res) {
        const articleId = req.params.id;
        const article = await db.query(`SELECT * FROM articles WHERE articleId = ${articleId}`);
        if (article.rows.length === 0) return res.status(404).json({
            status: 'error',
            error: 'article with the specified articleId NOT found'
        });
        res.status(200).json({
            status: 'success',
            data: article.rows[0]
        });
    };

    static async createSingleArticle(req, res){
        const { error } = validateArticle(req.body);
        if (error) return res.status(400).json({
            status: 'error',
            error: error.details[0].message
        });

        const { title, article, categoryId } = req.body;
        const createdOn = dateTime;
        const articleId = generateId(5484621);
        const category = await db.query(`SELECT * FROM categories WHERE categoryId = ${categoryId}`);
        if (category.rows.length === 0) return res.status(404).json({
            status: 'error',
            error: 'Category with the specified articleId NOT found',
        });

        await db.query(
            `INSERT INTO articles (articleId, title, article, createdOn, categoryId) 
            VALUES ($1, $2, $3, $4, $5)`, [articleId, title, article, createdOn, categoryId]
        );
        res.status(201).json({
            status: 'sucess', 
            data: {
                message: 'Article successfully posted',
                articleId,
                createdOn,
                title,
            }, 
        });
    };

    static async updateSingleArticle(req, res){
        const { error } = validateArticle(req.body);
        if (error) return res.status(400).json({message: error.details[0].message});

        const articleId = parseInt(req.params.id);
        const { title, article } = req.body;
        const articleResponse = await db.query(
            `UPDATE articles
            SET title = $1, article = $2
            WHERE articleId = ${articleId} `,
            [title, article]
          );

        if (articleResponse.rowCount === 0) return res.status(404).json({message: 'article Not Found'});
        await res.status(201).json({
            status: 'success',
            data: {
                message: 'Article successfully updated',
                title,
                article,
            }
        });
    };

    static async deleteSingleArticle(req, res){
        const articleId = parseInt(req.params.id);
        const article = await db.query(`DELETE FROM articles WHERE articleId = ${ articleId }`);
        if (article.rowCount === 0) return res.status(404).json({message: 'article Not Found'});
        res.status(202).json({ 
            status: 'success',
            data: {
                message: "Article succesfully deleted",
            }
        });
    };
}

const validateArticle = article => {
    const schema = Joi.object().keys({
        title : Joi.string().max(50).required(),
        article: Joi.string().max(2500).required(),
        // categoryId: Joi.number().required()
    });
    return schema.validate(article);
}


module.exports = ArticleController;