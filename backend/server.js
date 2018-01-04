const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const app = Express();
const router = require('./routes/router');

const PORT = 3000;
const FRONTEND_PATH = 'frontend';
const MONGO_HOST_NAME = 'localhost';
const MONGO_DATABASE_NAME = 'zaster';


Mongoose.Promise = global.Promise;
Mongoose.connect(`mongodb://${MONGO_HOST_NAME}/${MONGO_DATABASE_NAME}`);

app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

app.use(Express.static(FRONTEND_PATH));

app.use('/api', router);

app.get('/', (req, res) => {
    res.sendFile(`${FRONTEND_PATH}/index.html`);
});

app.listen(3000, () => {
    console.log(`Server listening on port ${PORT}!`);
});
