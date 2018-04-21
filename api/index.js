import path from 'path'
import express from 'express'

import { mgDB } from './db/mongo'
import { install } from './../migration/install'


/**
 *
 * @param {string} collectionName
 * @param {Array} data
 * @returns {Promise.<void>}
 */
async function migrate(collectionName, data) {
  const collection = await mgDB(collectionName)
  collection.insertOne(data, (err, res) => {
    // console.log(err, res)
  })
}



// const collection = db.collection('iron');

for (let collectionData of install) {
  for (let entity of collectionData) {
    migrate(entity.constructor.name, entity)
  }
}

// console.log(install[0][0].constructor.name)

const app = express();

app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname + '/../public')));

app.get('/', function(req, res) {
    res.sendFile('/../../public/index.html');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
