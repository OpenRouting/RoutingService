/**
 * Created by christopherfricke on 3/29/15.
 */

var express = require('express'),
    util = require('util'),
    pg = require('pg'),
    async = require('async');

exports.RouteModel = function(databaseConfig){
    this.fields = [];
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
 * Returns all of the field names
 * @returns {Array}
 */
exports.RouteModel.prototype.getFieldNames = function(){
    var fieldNames = [];
    for (var f in this.fields){
        if (['point', 'line', 'polygon'].indexOf(this.fields[f].type) >= 0){
            fieldNames.push(util.format('ST_AsGeoJson(%s) %s', this.fields[f].name, this.fields[f].name));
        } else {
            fieldNames.push(this.fields[f].name);
        }
    }
    return fieldNames;
};

/**
 * Returns the (first) spatial field
 * @returns {*}
 */
exports.RouteModel.prototype.getSpatialField = function() {
    for (var f in this.fields){
        if (['point', 'line', 'polygon'].indexOf(this.fields[f].type) >= 0){
            return this.fields[f].name;
        }
    }
    return false;
};

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
                if (spatialField && spatialField != null){
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
            async.map(points.features, function(item, callback){
                var query = util.format("SELECT routing.get_waypoint(ST_GeomFromGeoJSON('%s'))", JSON.stringify(item.geometry));
                self.query(query, [], callback);
            }, function(err, results){
                if (err == null){
                    var out = [];
                    for (var i in results){
                        out.push(results[i][0].get_waypoint);
                    }
                    callback(undefined, out);
                } else {
                    callback(err);
                }
            });
        },
        // Build Route
        function(points, callback){
            callback(undefined, points);
        }
    ], function(err, data){
        if (err == null){
            callback(data);
        } else {
            callback({message: err})
        }
    });


};

