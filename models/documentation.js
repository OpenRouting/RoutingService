/**
 * Created by christopherfricke on 3/28/15.
 */
var express = require('express');

exports.DocumentationModel = function(){
    this.documentation = [
        {
            route: '/api/v1',
            title: 'Documentation',
            description: 'Documentation about the routes.'
        },{
            route: '/api/v1/table',
            title: 'Tables',
            description: 'Returns a list of tables included in the service.',
            response: {
                tables: [
                    {
                        name: ':table name',
                        fields: [
                            {
                                'name': ':field name',
                                'type': ':field type'
                            }
                        ]
                    }
                ]
            }
        },{
            route: '/api/v1/table/:table',
            title: 'Table',
            description: 'Returns properties of a single table object.!',
            response: {
                tables: [
                    {
                        name: ':table name',
                        fields: [
                            {
                                'name': ':field name',
                                'type': ':field type'
                            }
                        ]
                    }
                ]
            }
        },{
            route: '/api/v1/route',
            title: 'Route',
            description: 'route!',
            response: {

            }
        },{
            route: '/api/v1/direction',
            title: 'Direction',
            description: 'direction!',
            response: {

            }
        }
    ]
};
