/**
 * Created by christopherfricke on 3/28/15.
 */
var TableModel = require('./table').TableModel;

describe("TableModel Tests", function() {
    "use strict";

    it("should be able to instantiate", function() {
        var tableConfig = {
            table: 'test',
            fields: []
        };
        var databaseConfig = {
            username: process.env.username || 'dev',
            password: process.env.password || 'devP@a$$word',
            hostname: process.env.hostname || 'localhost',
            database: process.env.database || 'osm'
        };

        expect(new TableModel(tableConfig, databaseConfig)).toBeDefined();
    });

    it("should be able to perform a select-all query", function(){
        var tableConfig = {
            table: 'test',
            fields: []
        };
        var databaseConfig = {
            username: process.env.username || 'dev',
            password: process.env.password || 'devP@a$$word',
            hostname: process.env.hostname || 'localhost',
            database: process.env.database || 'osm'
        };

        var table = new TableModel(tableConfig, databaseConfig);

        console.log(table.connectionString);

        table.query('asdf', function(err, data){
            console.log(data);
        });
    });

});