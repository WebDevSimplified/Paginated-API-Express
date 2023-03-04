const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


const v1Routes = require('./src/v1/routes');

app.use(express.static('public'))
app.use("/docs", express.static('doc'))
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// mount api v1 routes
app.use('/api/v1', v1Routes);


/* Error handler middleware */
app.use((err, _, res, __) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});


module.exports = app;