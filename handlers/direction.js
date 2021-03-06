/**
 * Created by christopherfricke on 3/27/15.
 */
var express = require('express'),
    ControllerFactory = require('../controllers/factory.js').ControllerFactory,
    controllerFactory = new ControllerFactory(),
    directionController = controllerFactory.getDirectionController(),
    settings = require('../settings').settings;

exports.directionUIHandler = function (req, res) {
    res.render('route', {title:'Routing Engine', restrictions: settings.routing.restrictions, postUrl: '/api/v1/direction'});
};


exports.directionHandler = function (req, res) {
    var restrictions;
    var points;


    try {
        if (req.body.routepoints instanceof Object){
            points = req.body.routepoints;
        } else {
            points = JSON.parse(req.body.routepoints);
        }
    } catch(err){
        res.status(400).json({message: 'Invalid GeoJson passed into routing service: ' + req.body.routepoints});
        return;
    }
    if (req.body.restrictions == null) {
        restrictions = [];
    } else if (typeof req.body.restrictions === 'string'){
        restrictions = [req.body.restrictions]
    } else {
        restrictions = req.body.restrictions
    }

    if (restrictions != null || restrictions.length > 0){
        for (var r in restrictions){
            if (settings.routing.restrictions[restrictions[r]] == null){
                res.status(400).json({message: 'Invalid Restriction passed into routing service: ' + restrictions[r]});
                return;
            }
        }
    }

    var routeType = 'pgRouteModel';

    directionController.getDirection(routeType, points, restrictions, function(err, result){
        if (err == null){
            res.json(result);
        } else {
            res.status(400).json(err)
        }
    });
};