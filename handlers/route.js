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
    try {
        var points = JSON.parse(req.body.routepoints);
    } catch(err){
        res.status(400).json({message: 'Invalid GeoJson passed into routing service: ' + req.body.routepoints});
        return;
    }
    var restrictions = (typeof req.body.restrictions === 'string') ? [req.body.restrictions] : req.body.restrictions;

    if (restrictions != null || restrictions.length > 0){
        for (var r in restrictions){
            if (settings.routing.restrictions[restrictions[r]] == null){
                res.status(400).json({message: 'Invalid Restriction passed into routing service: ' + restrictions[r]});
                return;
            }
        }
    }

    var routeType = 'pgRouteModel';

    routeController.getRoute(routeType, points, restrictions, function(err, result){
        if (err == null){
            res.json(result);
        } else {
            res.status(400).json(err)
        }
    });
};
