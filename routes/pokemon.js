const MongoClient = require('mongodb').MongoClient
const GridFSBucket = require('mongodb').GridFSBucket
const fs = require('fs')
const express = require('express');
const router = express.Router();

router.get('/pokemon', (request, response) => {
    MongoClient.connect('mongodb://Test:password@ds051913.mlab.com:51913/pokemon', (err, client) => {
        if (err) return console.log(err)
        const db = client.db('pokemon')
        const collection = db.collection('pokemon')

        collection.find({
            name: {
                $regex: `^${request.query.name}`,
                $options: 'i'
            }
        }, (err, results) => {
            results.toArray((err, documents) => {
                return response.send(documents)
            })
        })
    })
})

router.get('/image/:number', (request, response) => {
    MongoClient.connect('mongodb://Test:password@ds051913.mlab.com:51913/pokemon', (err, client) => {
        if (err) return console.log(err)
        const db = client.db('pokemon')
        var bucket = new GridFSBucket(db);

        var pad = '0000';
        var padded = (pad + request.params.number).slice(-pad.length);
        bucket.openDownloadStreamByName(`/Users/jordanrizzieri/Desktop/POKEMON/${padded}.png`).on('data', data => {
            response.type('png')
            response.send(data)
        })
    })
})

router.put('/comment/:number', (request, response) => {
    MongoClient.connect('mongodb://Test:password@ds051913.mlab.com:51913/pokemon', (err, client) => {
        if (err) return console.log(err)
        const db = client.db('pokemon')
        const collection = db.collection('pokemon')
        
        collection.updateOne({
            number: parseInt(request.params.number)
        }, {
            $push: {
                comment: request.body.comment
            }
        }, (error2, result) => {
        })
        client.close()
    })
})
module.exports = router;