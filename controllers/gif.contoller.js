require('../models/db/gif')();
const db = require('../models/db/index');
const express = require('express');
const cloudinary = require('cloudinary');
const generateId = require('../logics/identity');

const router = express.Router();

cloudinary.config({
    cloud_name: 'terahpatrick',
    api_key: '895228937862312',
    api_secret: 'MxRRWkDUgcXya-RaSafuEaxKlMU',
});

class GifController {

    static async getAllgifs(req, res) {
        const gifs = await db.query(`SELECT * FROM gifs ORDER BY createdOn DESC`);
        res.status(200).json({
            status: 'Success',
            data: articles.rows
        });
    };

    static async postGif(req, res) {
        const file = req.files.image;
        if (!file) return res.status(200).json({message: 'Image is required'});
        const { title } = req.body;
        if (!title) return res.status(400).json({message: 'title is required'});
        const gifcloud = await cloudinary.v2.uploader.upload(file.tempFilePath);
        const { secure_url, created_at, public_id } = gifcloud;
        const identity = generateId(100000);
        
        const gif = await db.query(
            `INSERT INTO gifs (gifId, title, imageUrl, createdOn, publicId) 
            VALUES ($1, $2, $3, $4, $5)`, [identity, title, secure_url, created_at, public_id]
        );
        res.status(201).json({
            status: 'sucess', 
            data: {
                gifId: identity,
                message: 'GIF image successfully posted.',
                createdOn: created_at,
                title,
                imageUrl: secure_url,
                publicId: public_id
            } 
        });
    }

    static async deleteGif(req, res){
        const { gifId } = req.params;
        const gif = await db.query(`SELECT * FROM gifs WHERE gifId = ${gifId}`);
        if (gif.rows.length === 0) return res.status(404).json({
            status: 'error',
            error: 'gif with the specified gifId NOT found'
        });

        
        cloudinary.v2.uploader.destroy(gif.rows[0].publicid, function(error,result) {
            console.log(result, error) 
        });
        

        await db.query(`DELETE FROM gifs WHERE gifId = ${ gifId }`);
        if (gif.rowCount === 0) return res.status(404).json({message: 'Gif Not Found'});
        res.status(202).json({ 
            status: 'success',
            message: "gif succesfully deleted",
            publicId: gif.rows[0].publicid
        });
    };

}

module.exports = GifController;