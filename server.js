const express = require('express');
// import environment variables store in the .env file

const app = express();

// handle the middleware stuffs

app.use('/', express.static('public'));

app.listen(process.env.PORT, (err) =>
{
    if (err)
    {
        console.log('Error starting server: ', err);
    }
    console.log(`Server is listening on port ${process.env.PORT}...`);
});