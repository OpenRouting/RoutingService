/**
 * Created by christopherfricke on 3/29/15.
 */
var express = require('express'),
    settings = require('../settings').settings;

exports.RouteController = function(modelFactory){
    this.routeModels = {
        pgRouteModel: modelFactory.getRouteModel('pgrouting')
    };
};

exports.RouteController.prototype.getRoute = function(routeType, points, restrictions, callback){
    this.routeModels[routeType].buildRoute(points, restrictions, callback);
};