/**
 * Created by christopherfricke on 3/28/15.
 */
var express = require('express');

exports.DocumentationModel = function(){
    this.documentation = [
        {
            route: '/api/v1',
            title: 'Documentation',
            description: 'documentation!'
        },{
            route: '/api/v1/table',
            title: 'Tables',
            description: 'tables!'
        },{
            route: '/api/v1/table/:table',
            title: 'Tables',
            description: 'tables!'
        },{
            route: '/api/v1/route',
            title: 'route',
            description: 'route!'
        },{
            route: '/api/v1/direction',
            title: 'Direction',
            description: 'direction!'
        }
    ]
};
