/**
 * Created by christopherfricke on 3/29/15.
 */

var express = require('express'),
    util = require('util'),
    pg = require('pg');

exports.RouteModel = function(tableConfig, databaseConfig){
    var self = this;

    this.table = tableConfig.name;
    this.fields = tableConfig.fields;
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
exports.RouteModel.prototype.RouteFeature = function(routeFeatureInfo){
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
};