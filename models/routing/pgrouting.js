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
function DirectionFeature(routeFeatureInfo){
    this.type = 'Feature';
    this.geometry = {};
    this.properties = {
        name: undefined,
        seq: undefined
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
 * @param doUnion - If true then unionize route into a single line feature. Otherwise return feature set
 */
exports.RouteModel.prototype.buildRoute = function(points, restrictions, callback, doUnion){
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

    // Determine whether to union resultinto a single line
    if (doUnion == undefined){
        doUnion = false
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
            console.log(query);
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

exports.RouteModel.prototype.buildDirection = function(points, restrictions, callback){
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
                async.map(points.features, function (item, cbeach) {
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
                console.log(query);
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
                var query = util.format("SELECT * FROM routing.get_route_by_id(%s, %s, ARRAY[%s]::text[]) route, routing.waypoint WHERE route.source = waypoint.sourceid", pointIds[0], pointIds[1], parsedRestrictions.join(','));
                console.log(query);
                client.query(query, [], function (err, result) {
                    if (err != null) {
                        cb(err);
                    }
                    else if (result == null) {
                        cb('Cannot build route.');
                    }
                    else {
                        var directions = [];
                        for (var r in result.rows) {
                            directions.push(new DirectionFeature(result.rows[r]))
                        }
                        cb(undefined, {routes: routes, directions: directions});
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

