import { publicPath, basePath } from './lib/path'
import path from 'path'
import express from 'express'

const app = express();

app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname + '/../public')));

app.get('/', function(req, res) {
    res.sendFile(publicPath('index.html'));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
