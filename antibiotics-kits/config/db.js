var mongoose = require('mongoose');

const db_path = ```vivianleung:1309Westlink@ds151661.mlab.com:51661/antibiotics_kits```;
mongoose.connect(db_path);

// mongoose.connection('mongodb://vivianleung:1309Westlink@ds151661.mlab.com:51661/antibiotics_kits')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
  // we're connected!
});

module.exports = db;
