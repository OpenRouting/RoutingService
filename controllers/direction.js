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
    var self = this;
    async.waterfall([
        function(cb){
            self.routeModels[routeType].buildRoute(points, restrictions, cb)
        },
        function(routeGeometry, cb){
            self.waypoint.intersects(routeGeometry, function(err, data){
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