var db = require('../libs/db_connection')();
var Schema = require('mongoose').Schema;

module.exports = function (app) {
    var user_schema = Schema({
        nome: {type: String, require: true},
        email: {type: String, require: true},
        nascimento: {type: String, require: true},
        celular: {type: Number, require: true},
    });

    db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});


    return db.model('users', user_schema);
}
