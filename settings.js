/**
 * Created by christopherfricke on 3/28/15.
 */
exports.settings = {
    tables: [
        {
            name: 'planet_osm_points',
            fields: [{
                name: 'osm_id',
                type: 'int'
            }]
        },{
            name: 'planet_osm_line',
            fields: [{
                name: 'osm_id',
                type: 'int'
            }]
        }
    ]
};