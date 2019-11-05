require('../models/db/genre')();
const db = require('../models/db/index');
const Joi = require('@hapi/joi');

class GenreController {

    static async getAllGenres(req, res){
        const genres = await db.query(`SELECT * FROM genres`);
        res.status(200).json({
            status: 'Success',
            data: genres.rows
        });
    };


    static async getSingleGenre(req, res){
        const genre_id = parseInt(req.params.id);
        const genre = await db.query(`SELECT * FROM genres WHERE genre_id = ${genre_id}`);
        if (genre.rows.length === 0) return res.status(404).json({
            status: 'error',
            error: 'Genre with the specified genreId NOT found'
        });
        res.status(200).json({
            status: 'success',
            data: genre.rows[0]
        });
    };

    static async createSingleGenre(req, res){
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).json({
            status: 'error',
            error: error.details[0].message
        });

        const { genre_id, genre_name } = req.body;
        const genre = await db.query(
            `INSERT INTO genres (genre_id, genre_name) 
            VALUES ($1, $2)`, [genre_id, genre_name]
        );
        res.status(201).json({
            status: 'sucess', 
            message: 'Genre Successfully created' 
        });
    };

    static async updateSingleGenre(req, res){
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).json({message: error.details[0].message});

        const genre_id = parseInt(req.params.id);
        const { genre_name } = req.body;
        const genre = await db.query(
            `UPDATE genres
            SET genre_name = $1
            WHERE genre_id = ${genre_id} `,
            [genre_name]
          );

        if (genre.rowCount === 0) return res.status(404).json({message: 'Genre Not Found'});
        await res.status(201).json({
            status: 'success',
            message: 'Genre succesfully updated'
        });
    };

    static async deleteSingleGenre(req, res){
        const genre_id = parseInt(req.params.id);
        const genre = await db.query(`DELETE FROM genres WHERE genre_id = ${ genre_id }`);
        if (genre.rowCount === 0) return res.status(404).json({message: 'Genre Not Found'});
        res.status(202).json({ 
            status: 'success',
            message: "Genre succesfully deleted",
        });
    };
}

const validateGenre = genre => {
    const schema = Joi.object().keys({
        genre_id : Joi.number().required(),
        genre_name: Joi.string().min(2).max(50).required()
    });
    return schema.validate(genre);
}


module.exports = GenreController;