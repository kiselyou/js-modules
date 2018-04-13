import path from 'path'
import express from 'express'

const app = express();
const publicCatalog = path.join(__dirname + '/../src')

app.use('/src', express.static(publicCatalog));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
