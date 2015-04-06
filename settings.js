/**
 * Created by christopherfricke on 3/28/15.
 */
exports.settings = {
    database: {
        username: process.env.username || 'dev',
        password: process.env.password || 'devP@a$$word',
        hostname: process.env.hostname || 'localhost',
        database: process.env.database || 'routing'
    },
    routing: {
        restrictions: {
            isPublic: 'Publicly Accessible',
            isActive: 'Active',
            isEmergency: 'Emergency Accessibility'
        }
    },
    tables: {
        ways: {
            name: 'routing.way',
            fields: [{
                name: 'objectid',
                type: 'int'
            },{
                name: 'shape',
                type: 'line'
            }]
        },
        ways_vertices_pgr: {
            name: 'routing.way_vertices_pgr',
            fields: [{
                name: 'id',
                type: 'int'
            },{
                name: 'the_geom',
                type: 'point'
            }]
        },
        waypoint: {
            name: 'routing.waypoint',
            srid: 4326,
            fields: [{
                name: 'objectid',
                type: 'int'
            },{
                name: 'shape',
                type: 'point'
            }]
        },
        poi: {
            name: 'routing.waypoint',
            srid: 4326,
            fields: [{
                name: 'objectid',
                type: 'int'
            },{
                name: 'shape',
                type: 'point'
            },{
                name: 'name',
                type: 'string'
            }]
        }
    }
};