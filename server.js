const express = require('express');
const bodyParser = require('body-parser');
const accountRouter = require('./routes/account')
const path = require('path');

let app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));


app.use('/account/', accountRouter);

app.get('/home', (req, res, next) => {
    var file_path = path.join(__dirname, 'views/index.html');
    res.sendFile(file_path);
})

app.listen(3000)