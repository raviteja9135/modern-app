const client =  require('./dbConnection');
const express = require('express');
const router = express.Router();

router.route('/').get(async function(_req,res) {
    const db = client.getDb();
    let databasesList = await db.admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
    return res.status(200).send(databasesList);
});

router.route('/addDocument').post(async function(req,res) {
    const db = client.getDb();
    const query = req.body;
 
    if(query.user.firstName) {
        const result = await db.collection('personal-details').insertOne(query);
        return res.status(200).send(result);
    } else {
        console.error('Bad Request');
        return res.status(400).send()
    }
});

router.route('/checkCredentials').post(async function(req, res) {
    const db = client.getDb();
    const query = {
        'user.userName': req.body.userName
      }
    try{
        const cursor = await db.collection('personal-details').find(query);
        const result = await cursor.toArray();
    return res.status(200).send(result);
    } catch {
        const result = await db.collection('personal-details').find({});
        return res.status(500).send(result);
    }
});

router.route('/getAllDocs').get(async function(_req,res) {
    const db = client.getDb();

    try{
    const cursor = await db.collection('personal-details').find(_req.body);
    const result = await cursor.toArray();
        return res.status(200).send(result);
    } catch {
        console.error('Bad Request');
        return res.status(400).send()
    }
});

module.exports = router;


