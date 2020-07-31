var mongoose = require('mongoose');
var connection;

module.exports = function () {
    if (! connection) {
        connection = mongoose.connect('mongodb+srv://user:password@cluster0-e3tat.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    return mongoose.connection;
}
