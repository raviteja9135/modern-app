const express = require('express');
const dbConn = require('./dbConnection');
const sampleRouter = require('./sample-db');
const todoRouter = require('./todo-db')
const cors = require('cors');
const app = express();


// app.use('/', (req, res) => {
//     res.send('hello world');
// });
app.use(cors());
app.use(express.json());
if (process.env.APP) {
 app.use(todoRouter);
}else {
  app.use(sampleRouter);
}


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
