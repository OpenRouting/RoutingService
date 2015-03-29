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
        ways: {
            name: 'routing.ways',
            fields: [{
                name: 'gid',
                type: 'int'
            },{
                name: 'the_geom',
                type: 'line'
            }]
        },
        ways_vertices_pgr: {
            name: 'routing.ways_vertices_pgr',
            fields: [{
                name: 'id',
                type: 'int'
            },{
                name: 'the_geom',
                type: 'point'
            }]
        }
    }
};