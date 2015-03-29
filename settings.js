/**
 * Created by christopherfricke on 3/28/15.
 */
exports.settings = {
    database: {
        username: process.env.username || 'dev',
        password: process.env.password || 'devP@a$$word',
        hostname: process.env.hostname || 'localhost',
        database: process.env.database || 'osm'
    },
    tables: {
        planet_osm_point: {
            name: 'osm.planet_osm_point',
            fields: [{
                name: 'osm_id',
                type: 'int'
            },{
                name: 'way',
                type: 'point'
            }]
        },
        planet_osm_line: {
            name: 'osm.planet_osm_line',
            fields: [{
                name: 'osm_id',
                type: 'int'
            },{
                name: 'way',
                type: 'line'
            }]
        }
    }
};