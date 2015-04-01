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
function RouteFeature(routeFeatureInfo){
    this.type = 'Feature';
    this.geometry = {};
    this.properties = {
        gid: undefined
    };

    for (var p in routeFeatureInfo){
        if (this.properties.hasOwnProperty(p) && p !== 'geometry'){
            this.properties[p] = routeFeatureInfo[p];
        } else if (p === 'geometry'){
            this.geometry = routeFeatureInfo.geometry;
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

    pg.connect(this.connectionString, function(err, client, done) {
        if(err) {
            callback({message: 'error fetching client from pool' + err});
        }
        async.waterfall([function(cb){
            async.map(points.features, function(item, cbeach){
                var query = util.format("SELECT routing.get_waypoint(ST_GeomFromGeoJSON('%s'))", JSON.stringify(item.geometry));
                client.query(query, [], function(err, result) {
                    if (err == null){
                        cbeach(undefined, result.rows[0].get_waypoint);
                    } else {
                        cbeach(err);
                    }
                })

                }, cb);
        }, function(pointIds, cb){
            var query = util.format("SELECT * FROM routing.get_route_by_id(%s, %s, %s)", pointIds[0], pointIds[1], restrictions);
            client.query(query, [], function(err, result){
                if (err != null) cb(err);
                var routes = [];
                for (var r in result.rows){
                    routes.push(new RouteFeature(result.rows[r]))
                }
                cb(undefined, routes);

            });
        }], function(err, data){

            done();
            client.end();

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

