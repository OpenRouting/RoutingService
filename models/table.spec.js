/**
 * Created by christopherfricke on 3/28/15.
 */
var TableModel = require('./table').TableModel;

describe("TableModel Tests", function() {
    "use strict";

    it("should be able to instantiate", function() {
        var tableConfig = {
            name: 'test',
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

    it("should be able to get all records", function(){
        var tableConfig = {
            name: 'osm.planet_osm_line',
            fields: []
        };
        var databaseConfig = {
            username: process.env.username || 'dev',
            password: process.env.password || 'devP@a$$word',
            hostname: process.env.hostname || 'localhost',
            database: process.env.database || 'osm'
        };

        var table = new TableModel(tableConfig, databaseConfig);
        table.getRecords(function(err, data){
            if (err){
                console.log(err);
            }
            expect(data.rows.length).toBeGreaterThan(0);
        });
    });

});