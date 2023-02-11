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
    const query = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        last_modified: new Date(),
        profilePic: res.profilePic || null
    }
 
    if(query.firstName) {
    const result = await db.collection('personal-details').insertOne(query);

        return res.status(200).send(result);
    } else {
        console.error('Bad Request');
        return res.status(400).send()
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

// async function addMultipleDocuments( documents) {
//     const result  = await clientCollection.insertMany(documents);
//     console.log(result.insertedCount);
// }

// async function updatePersonalDetails () {
//     const result = await clientCollection.Update;
// }

// async function findDocument( query) {
//     const result  = await clientCollection.findOne({"userName": query});
//     console.log(result);
// }

// async function createDocument (document) {
//     const result = await clientCollection.insertOne(document);
//     console.log(result.insertedId);
// }

module.exports = router;


