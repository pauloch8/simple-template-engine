const express = require('express');
const marked = require('marked');
const fs = require('fs');
const util = require('util');
const app = express();
const port = 3001;

const fsreadfile = util.promisify(fs.readFile);

app.engine('md', async (filePath, options, callback) => {
    try{
        const content = await fsreadfile(filePath);
        const rendered = content.toString().replace('{headline}', options.headline);
        return callback(null, marked(rendered));
    }catch(err){
        return callback(err);
    }
});

app.set('views', 'views');
app.set('view engine', 'md');

function handler(req, res){
    return res.render('index', {headline: 'Hello World'});
}

app.get('/', handler);

app.listen(port, 
    () => console.log(`Hello world listening on port ${port}`)
);