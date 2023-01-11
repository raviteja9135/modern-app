const express = require('express');
const dbConn = require('./dbConnection');
const router = require('./sample-db');
const cors = require('cors');
const app = express();


// app.use('/', (req, res) => {
//     res.send('hello world');
// });
app.use(cors());
app.use(express.json());
app.use(router);

dbConn.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
  
    // start the Express server
    app.listen(9080, () => {
      console.log(`Server is running on port: 9080`);
    });
  });
