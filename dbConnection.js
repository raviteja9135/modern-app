const {MongoClient} = require('mongodb');


/**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
const uri = "mongodb+srv://raviteja:marty135@modernapp.awikqga.mongodb.net/?retryWrites=true&w=majority";
 
const client = new MongoClient(uri);

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect();
    if(process.env.APP == 'todo') {
      dbConnection = client.db('todo');
    } else {
      dbConnection = client.db('user-details');
    }
    console.log('Successfully connected to MongoDB.');
    return callback();
  },
  getDb: function () {
    return dbConnection;
  }
};
