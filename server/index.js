import { publicPath, basePath } from './lib/path'
import express from 'express'

const app = express();
// const publicCatalog = path.join(__dirname + '/../src')
const publicCatalog = basePath('/../src')

app.use('/src', express.static(publicCatalog));

app.get('/', function(req, res) {
    res.sendFile(publicPath('index.html'));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
