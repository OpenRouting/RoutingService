/**
 * Created by christopherfricke on 3/28/15.
 */
/**
 * Created by christopherfricke on 3/28/15.
 */
var express = require('express'),
    util = require('util'),
    pg = require('pg');

exports.TableModel = function(tableConfig, databaseConfig){
    this.table = tableConfig.name;
    this.fields = tableConfig.fields;
    this.connectionString = util.format('postgres://%s:%s@%s/%s',
                                        databaseConfig.username,
                                        databaseConfig.password,
                                        databaseConfig.hostname,
                                        databaseConfig.database);
};
exports.TableModel.prototype.query = function(query, parameters, callback){
    pg.connect(this.connectionString, function(err, client, done) {
        if(err) {
            callback('error fetching client from pool' + err);
        }
        client.query(query, parameters, function(err, result) {
            done();
            callback(err, result);
            client.end();
        });
    });
};

exports.TableModel.prototype.getRecords = function(callback){
    this.query('SELECT * FROM ' + this.table, [], callback)
};