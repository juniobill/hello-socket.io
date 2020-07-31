var express = require('express');
var router = express.Router();

module.exports = function (app) {
    var controller = app.controller.pages;

    app.get('/', controller.index);
}
