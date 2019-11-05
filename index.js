require('express-async-errors');
const bodyParser = require('body-parser');
const app = require('./app');

const genres = require('./routes/genre.route');
const cloudGifs = require('./logics/cloudinary');
const categories = require('./routes/category.route');
const articles = require('./routes/article.route');
const articleComments = require('./routes/articleComment.route');
const gifComments = require('./routes/gifComment.route');

app.use(bodyParser.json());
app.use('/api/genres', genres);
app.use('/v1/gifs', cloudGifs);
app.use('/api/categories', categories);
app.use('/v1/articles', articles);
app.use('/api/articleComment', articleComments);
app.use('/api/gifComment', gifComments);

const port = process.env.PORT || 2500;
const server = app.listen(port, console.log(`Listening to port ${port}...`));

module.exports = server;
