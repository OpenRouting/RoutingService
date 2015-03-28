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
                                        databaseConfig.database)
};
exports.TableModel.prototype.query = function(query, callback){
    pg.connect(this.connectionString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT $1::int AS number', ['1'], function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }
            console.log(result.rows[0].number);
            //output: 1
            client.end();
            callback(result.rows[0].number);
        });
    });
};