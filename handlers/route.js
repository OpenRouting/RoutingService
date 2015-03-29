/**
 * Created by christopherfricke on 3/27/15.
 */
var express = require('express'),
    ControllerFactory = require('../controllers/factory.js').ControllerFactory,
    controllerFactory = new ControllerFactory(),
    routeController = controllerFactory.getRouteController(),
    settings = require('../settings').settings;

exports.routeUIHandler = function (req, res) {
    res.render('route', {title:'Routing Engine', restrictions: settings.routing.restrictions});
};

exports.routeHandler = function (req, res) {
    var points = JSON.parse(req.body.routepoints);
    var restrictions = (typeof req.body.restrictions === 'string') ? [req.body.restrictions] : req.body.restrictions;
    var routeType = 'pgRouteModel';

    routeController.getRoute(routeType, points, restrictions, function(err, result){
        if (err == null){
            res.json(result);
        } else {
            res.status(400).json(err)
        }
    });
};
