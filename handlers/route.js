/**
 * Created by christopherfricke on 3/27/15.
 */
var express = require('express'),
    ControllerFactory = require('../controllers/factory.js').ControllerFactory,
    controllerFactory = new ControllerFactory(),
    routeController = controllerFactory.getRouteController();

exports.routeHandler = function (req, res) {
    var points = req.body.points;
    var restrictions = req.body.restrictions;
    var routeType = 'pgRouteModel';

    routeController.getRoute(routeType, points, restrictions, function(err, result){
        if (err == null){
            res.json(result);
        } else {
            res.status(400).json(err)
        }
    })

};
