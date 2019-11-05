const db = require('./index');

module.exports = () => {
        const createCategoriesTable = async () => {
                try {
                        await db.query( `CREATE TABLE IF NOT EXISTS categories (
                                categoryId serial PRIMARY KEY, 
                                categoryName VARCHAR (50) UNIQUE NOT NULL )`); 
                } catch (error) {
                       console.log(error); 
                }
        };
        
        createCategoriesTable();
};
