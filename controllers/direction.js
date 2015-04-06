/**
 * Created by christopherfricke on 3/29/15.
 */
var express = require('express'),
    async = require('async');

exports.DirectionController = function(modelFactory, a){
    this.routeModels = {
        pgRouteModel: modelFactory.getRouteModel('pgrouting')
    };
    this.waypoint = modelFactory.getTableModel('waypoint')
};

exports.DirectionController.prototype.getDirection = function(routeType, points, restrictions, callback){
    this.routeModels[routeType].buildDirection(points, restrictions, callback);
};