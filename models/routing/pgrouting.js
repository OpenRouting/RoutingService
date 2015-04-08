/**
 * Created by christopherfricke on 3/29/15.
 */

var express = require('express'),
    util = require('util'),
    pg = require('pg'),
    async = require('async');

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
 * Factory for building route features as GeoJson
 * @param routeFeatureInfo
 * @constructor
 */
function DirectionFeature(routeFeatureInfo, type){
    this.type = 'Feature';
    this.geometry = {};
    this.properties = {
        direction_text: undefined,
        direction_type: undefined,
        seq: undefined,
        distance:0,
        floor:undefined,
        time: 0
    };
    if (type === 'start'){
        this.properties.direction_text = 'Start at ' + routeFeatureInfo.properties.name;
    }
    else if (type === 'end'){
        this.properties.direction_text = 'End at ' + routeFeatureInfo.properties.name;
    }
    else {
        this.properties.direction_text = 'Go Through ' + routeFeatureInfo.name;
    }

    for (var p in routeFeatureInfo){
        if (this.properties.hasOwnProperty(p) && p !== 'geometry' && p !== 'geom'){
            this.properties[p] = routeFeatureInfo[p];
        } else if (p === 'geometry' || p === 'geom'){
            if (routeFeatureInfo[p] instanceof Object){
                this.geometry = routeFeatureInfo[p]
            } else {
                this.geometry = JSON.parse(routeFeatureInfo[p]);

            }
        }
    }
}

/**
 * Factory for building route features as GeoJson
 * @param routeFeatureInfo
 * @constructor
 */
function RouteFeature(routeFeatureInfo){
    this.type = 'Feature';
    this.geometry = {};
    this.properties = {
        gid: undefined,
        name: undefined,
        seq: undefined,
        heading: undefined,
        costlength: undefined,
        costtime: undefined,
        source: undefined
    };

    for (var p in routeFeatureInfo){
        if (this.properties.hasOwnProperty(p) && p !== 'geometry'){
            this.properties[p] = routeFeatureInfo[p];
        } else if (p === 'geometry'){
            this.geometry = JSON.parse(routeFeatureInfo.geometry);
        }
    }
}

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
                var query = util.format("SELECT ST_AsGeoJson(ST_Transform(waypoint.SHAPE, 4326)) geometry, waypoint.name, route.seq, waypoint.floor, waypoint.facilityid, waypoint.floor, waypoint.waypointclass  FROM routing.get_route_by_id(%s, %s, ARRAY[%s]::text[]) route, routing.waypoint WHERE route.source = waypoint.sourceid", pointIds[0], pointIds[1], parsedRestrictions.join(','));
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

