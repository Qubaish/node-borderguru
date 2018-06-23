const config = require('./env');
const mongoose = require('mongoose');
mongoose.connect(config.db);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
