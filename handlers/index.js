/**
 * Created by christopherfricke on 3/27/15.
 */
var express = require('express'),
    ControllerFactory = require('../controllers/factory.js').ControllerFactory,
    controllerFactory = new ControllerFactory(),
    documentationController = controllerFactory.getDocumentationController();

exports.indexHandler = function (req, res) {
    documentationController.documentation(function(docs){
        res.json(docs);
    });

};
