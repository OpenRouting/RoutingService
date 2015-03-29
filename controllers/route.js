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

exports.RouteController.prototype.getRoute = function(type, points, restrictions, callback){
    this.routeModels[type].buildRoute(points, restrictions, callback);
};