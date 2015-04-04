/**
 * Created by christopherfricke on 3/29/15.
 */
var express = require('express'),
    async = require('async');

exports.DirectionController = function(modelFactory){
    this.routeModels = {
        pgRouteModel: modelFactory.getRouteModel('pgrouting')
    };
    this.waypoint = modelFactory.getTableModel('waypoint')
};

exports.DirectionController.prototype.getDirection = function(routeType, points, restrictions, callback){
    async.waterfall([
        function(cb){
            this.routeModels[routeType].buildRoute(points, restrictions, cb)
        },
        function(routeGeometry, cb){
            this.waypoint.intersects(routeGeometry, function(err, data){
                if (err != null){
                    cb(err)
                } else {
                    console.log(data);
                    cb(data);
                }
            });
        }
    ], callback)
};