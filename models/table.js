/**
 * Created by christopherfricke on 3/28/15.
 */

var express = require('express'),
    util = require('util'),
    pg = require('pg');

/**
 * Constructor for Table Objects
 * @param tableConfig - Table Configuration object
 * {
 *  name: table Name,
 *  fields: [{
 *      name: field Name,
 *      type: field Type
 *  }]
 * }
 * @param databaseConfig - Database Configuration Object
 * {
 *  username: postgres Username,
 *  password: postgres Password,
 *  hostname: postgres Hostname,
 *  database: postgres Database
 *  }
 * @constructor
 */
exports.TableModel = function(tableConfig, databaseConfig){
    var self = this;

    this.table = tableConfig.name;
    this.fields = tableConfig.fields;
    this.srid = tableConfig.srid;
    this.connectionString = util.format('postgres://%s:%s@%s/%s',
                                        databaseConfig.username,
                                        databaseConfig.password,
                                        databaseConfig.hostname,
                                        databaseConfig.database);
};

/**
 * Returns all of the field names
 * @returns {Array}
 */
exports.TableModel.prototype.getFieldNames = function(){
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
exports.TableModel.prototype.getSpatialField = function() {
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
exports.TableModel.prototype.query = function(query, parameters, callback){
    var self = this;
    //console.log(query);
    pg.connect(this.connectionString, function(err, client, done) {
        if(err) {
            callback({message: 'error fetching client from pool' + err});
        }
        client.query(query, parameters, function(err, result) {
            done();
            if (err != null){
                console.log(err);
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
 * Returns all records from a table
 * @param callback
 */
exports.TableModel.prototype.getRecords = function(callback){
    this.query(util.format('SELECT %s FROM %s', this.getFieldNames().join(','), this.table), [], callback)
};

/**
 * Performs 3D spatial intersect on source table against passed in geometry
 * @param geometry - GeoJson formatted geometry
 * @param callback
 */
exports.TableModel.prototype.intersects = function(geometry, callback){
    console.log(this.srid);
    this.query(util.format("SELECT %s FROM %s WHERE ST_3DIntersects(ST_SetSRID(%s, %s), ST_SetSRID(ST_GeomFromGeoJSON('%s'),%s))",
        this.getFieldNames().join(','),
        this.table,
        this.getSpatialField(),
        this.srid,
        JSON.stringify(geometry),
        this.srid
    ), [], callback)
};