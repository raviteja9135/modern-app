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

router.route('/addTask').post(async function(_req,res) {
    const db = client.getDb();
    const query = _req.body;
    console.log(query);
    const result = await db.collection('todo-list').insertOne(query);
    return res.status(200).send(result);
});

router.route('/getAllTasks').get(async function(_req,res) {
    const db = await client.getDb();
    const result = await db.collection('todo-list').find().toArray();

    return res.status(200).send(result);
});


module.exports = router;    
