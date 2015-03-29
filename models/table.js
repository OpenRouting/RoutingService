/**
 * Created by christopherfricke on 3/28/15.
 */

var express = require('express'),
    util = require('util'),
    pg = require('pg');

exports.TableModel = function(tableConfig, databaseConfig){
    var self = this;

    this.table = tableConfig.name;
    this.fields = tableConfig.fields;
    this.connectionString = util.format('postgres://%s:%s@%s/%s',
                                        databaseConfig.username,
                                        databaseConfig.password,
                                        databaseConfig.hostname,
                                        databaseConfig.database);
};

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

exports.TableModel.prototype.getSpatialField = function() {
    for (var f in this.fields){
        if (['point', 'line', 'polygon'].indexOf(this.fields[f].type) >= 0){
            return this.fields[f].name;
        }
    }
    return false;
};

exports.TableModel.prototype.query = function(query, parameters, callback){
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

exports.TableModel.prototype.getRecords = function(callback){
    this.query(util.format('SELECT %s FROM %s', this.getFieldNames().join(','), this.table), [], callback)
};