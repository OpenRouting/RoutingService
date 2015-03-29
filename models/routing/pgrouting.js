/**
 * Created by christopherfricke on 3/29/15.
 */

var express = require('express'),
    util = require('util'),
    pg = require('pg'),
    async = require('async');

exports.RouteModel = function(databaseConfig){
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
 * Executes a query against the database.
 * @param query - Query String
 * @param parameters - Query String Parameters
 * @param callback
 */
exports.RouteModel.prototype.query = function(query, parameters, callback){
    var self = this;
    pg.connect(this.connectionString, function(err, client, done) {
        if(err) {
            callback({message: 'error fetching client from pool' + err});
        }
        client.query(query, parameters, function(err, result) {
            done();
            if (err != null){
                callback({message: err});
            }
            else {
                var spatialField = self.getSpatialField();
                if (spatialField != null){
                    var formattedRows = [];
                    for (var i in result.rows){
                        var record = {
                            "type": "Feature",
                            "geometry": JSON.parse(result.rows[i][spatialField]),
                            "properties": result.rows[i]
                        };
                        delete record.properties[spatialField];
                        formattedRows.push(record);
                    }

                    callback(undefined, {
                        "type": "FeatureCollection",
                        "features": formattedRows
                    });

                } else {
                    callback(undefined, result.rows);
                }
            }
            client.end();
        });
    });
};

/**
 *
 * @param points - GeoJSON points
 * @param restrictions - Array of restriction variables
 * @param callback
 */
exports.RouteModel.prototype.buildRoute = function(points, restrictions, callback){
    var self = this;

    async.waterfall([
        // Get Point locations on network
        function(callback){
            callback();
        },
        // Build Route
        function(points, callback){
            callback();
        }
    ], function(err, data){
        callback({message: "sample, asdf, sample"});
    });


};

