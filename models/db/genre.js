const db = require('./index');

module.exports = () => {
        const createGenresTable = async () => {
                try {
                        await db.query( `CREATE TABLE IF NOT EXISTS genres (
                                genre_id serial PRIMARY KEY, 
                                genre_name VARCHAR (50) UNIQUE NOT NULL )`); 
                } catch (error) {
                       console.log(error); 
                }
        };
        
        createGenresTable();
};
