require('../models/db/articleComment')();
const db = require('../models/db/index');
const Joi = require('@hapi/joi');
const generateId = require('../logics/identity');

const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth()+1)}-${+today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;
class ArticleCommentController {

    static async writeComment (req, res){
        const { error } = validateArticleComment(req.body);
        if (error) return res.status(400).json({
            status: 'error',
            error: error.details[0].message
        });

        const { comment } = req.body;
        const { articleId } = req.params;
        const createdOn = dateTime;
        const commentId = generateId(5484621);
        const article = await db.query(`SELECT * FROM articles WHERE articleId = ${articleId}`);
        if (article.rows.length === 0) return res.status(404).json({
            status: 'error',
            error: 'Article with the specified ID NOT found',
        });
        await db.query(
            `INSERT INTO articles_comments (commentId, comment, createdOn, articleId) 
            VALUES ($1, $2, $3, $4)`, [commentId, comment, createdOn, articleId]
        );
        res.status(201).json({
            status: 'sucess', 
            message: 'Comment Successfully created' 
        });
    };
}

const validateArticleComment = comment => {
    const schema = Joi.object().keys({
        comment: Joi.string().max(100).required(),
    });
    return schema.validate(comment);
}


module.exports = ArticleCommentController;