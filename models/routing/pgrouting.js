/**
 * Created by christopherfricke on 3/29/15.
 */

var express = require('express'),
    util = require('util'),
    pg = require('pg'),
    async = require('async'),
    RouteFeature = require('./routefeature').RouteFeature,
    DirectionFeature = require('./directionfeature').DirectionFeature,
    directionList = require('./directionlist').directionList;

exports.RouteModel = function(databaseConfig){
    this.fields = [];
    this.geometryField = '';
    this.databaseConfig = databaseConfig;
    this.connectionString = util.format('postgres://%s:%s@%s/%s',
        databaseConfig.username,
        databaseConfig.password,
        databaseConfig.hostname,
        databaseConfig.database);
};

/**
 *
 * @param points - GeoJSON points
 * @param restrictions - Array of restriction variables
 * @param callback
 */
exports.RouteModel.prototype.buildRoute = function(points, restrictions, callback){
    var self = this;
    // Parse directions into a proper postgres string format
    var parsedRestrictions = [];
    if (restrictions instanceof Array){
        for (var i in restrictions){
            parsedRestrictions.push(util.format("'%s'", restrictions[i]))
        }
    } else {
        parsedRestrictions.push(util.format("'%s'", restrictions))
    }

    pg.connect(this.connectionString, function(err, client, done) {
        if(err) {
            callback({message: 'error fetching client from pool' + err});
        }
        async.waterfall([function(cb){
            async.map(points.features, function(item, cbeach){
                var query = util.format("SELECT routing.get_waypoint(ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('%s'), 4326), (SELECT Find_SRID('routing', 'way', 'shape'))))", JSON.stringify(item.geometry));
                client.query(query, [], function(err, result) {
                    if (err == null){
                        cbeach(undefined, result.rows[0].get_waypoint);
                    } else {
                        cbeach(err);
                    }
                })

                }, cb);
        }, function(pointIds, cb){
            var query = util.format("SELECT seq, gid, name, heading, costlength, costtime, ST_AsGeoJson(ST_Transform(geom, 4326)) geometry, source FROM routing.get_route_by_id(%s, %s, ARRAY[%s]::text[])", pointIds[0], pointIds[1], parsedRestrictions.join(','));
            //console.log(query);
            client.query(query, [], function (err, result) {
                if (err != null) {
                    cb(err);
                }
                else if (result == null) {
                    cb('Cannot build route.');
                }
                else {
                    var routes = [];
                    for (var r in result.rows) {
                        routes.push(new RouteFeature(result.rows[r]))
                    }
                    cb(undefined, routes);
                }

            });
        }
        ], function(err, data){

            done();
            //client.end();

            if (err == null){
                callback(undefined, {
                    "type": "FeatureCollection",
                    "features": data
                });
            } else {
                callback(err);
            }
        });
    });

};

exports.RouteModel.prototype.buildDirection = function(inputPoints, restrictions, callback){
    var self = this;
    var self = this;
    // Parse directions into a proper postgres string format
    var parsedRestrictions = [];
    if (restrictions instanceof Array){
        for (var i in restrictions){
            parsedRestrictions.push(util.format("'%s'", restrictions[i]))
        }
    } else {
        parsedRestrictions.push(util.format("'%s'", restrictions))
    }

    pg.connect(this.connectionString, function(err, client, done) {
        if (err) {
            callback({message: 'error fetching client from pool' + err});
        }
        async.waterfall([
            function (cb) {
                async.map(inputPoints.features, function (item, cbeach) {
                    var query = util.format("SELECT routing.get_waypoint(ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('%s'), 4326), (SELECT Find_SRID('routing', 'way', 'shape'))))", JSON.stringify(item.geometry));
                    client.query(query, [], function (err, result) {
                        if (err == null) {
                            cbeach(undefined, result.rows[0].get_waypoint);
                        } else {
                            cbeach(err);
                        }
                    })

                }, cb);
            }, function (pointIds, cb) {
                var query = util.format("SELECT seq, gid, name, heading, costlength, costtime, ST_AsGeoJson(ST_Transform(geom, 4326)) geometry, source FROM routing.get_route_by_id(%s, %s, ARRAY[%s]::text[])", pointIds[0], pointIds[1], parsedRestrictions.join(','));
                //console.log(query);
                client.query(query, [], function (err, result) {
                    if (err != null) {
                        cb(err);
                    }
                    else if (result == null) {
                        cb('Cannot build route.');
                    }
                    else {
                        var routes = [];
                        for (var r in result.rows) {
                            routes.push(new RouteFeature(result.rows[r]))
                        }
                        cb(undefined, routes, pointIds);
                    }

                });
            },
            function (routes, pointIds, cb) {
                // Perform a join between waypoint table and this route and order the
                // selected waypoints by seq of the route
                var query = util.format("SELECT ST_AsGeoJson(ST_Transform(waypoint.SHAPE, 4326)) geometry, waypoint.name, " +
                "route.seq, waypoint.floor, waypoint.facilityid, waypoint.floor, waypoint.waypointclass  " +
                "FROM routing.get_route_by_id(%s, %s, ARRAY[%s]::text[]) route, routing.waypoint " +
                "WHERE route.source = waypoint.sourceid", pointIds[0], pointIds[1], parsedRestrictions.join(','));

                //console.log(query);
                client.query(query, [], function (err, result) {
                    if (err != null) {
                        cb(err);
                    }
                    else if (result == null) {
                        cb('Cannot build route.');
                    }
                    else {
                        var directions = [];

                        directions.push(new DirectionFeature(inputPoints.features[0], 'start'));

                        for (var r in result.rows) {
                            directions.push(new DirectionFeature(result.rows[r]))
                        }
                        directions.push(new DirectionFeature(inputPoints.features[1], 'end'));

                        cb(undefined, {routes: {"type": "FeatureCollection", "features": routes},
                                       directions: {"type": "FeatureCollection", "features": directions}});
                    }

                });
            }
        ], function (err, data) {
            if (err == null) {
                callback(undefined, data);
            } else {
                callback(err)
            }
        })
    });
};

