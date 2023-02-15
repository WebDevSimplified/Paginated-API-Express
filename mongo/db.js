const { connect } = require('mongoose');

const db = {}

db.init = async(callback) => {
  try {
    await connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    console.log('\x1b[35m%s\x1b[0m', 'Status 200 => OK[mongoDB]');
    callback();
  } catch(error) {
    console.log("[mongodb] connection error:" + error);
  }
}

module.exports = db