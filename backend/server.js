const Express = require('express');

const app = Express();

const PORT = 3000;


app.use(Express.static('frontend'));

app.listen(3000, () => {
    console.log(`Server listening on port ${PORT}!`);
});
