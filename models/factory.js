/**
 * Created by christopherfricke on 3/28/15.
 */
var DocumentationModel = require('./documentation').DocumentationModel,
    TableModel = require('./table').TableModel,
    settings = require('../settings.js').settings;

exports.ModelFactory = function() {
    'use strict';
};

exports.ModelFactory.prototype.getDocumentationModel = function(){
    'use strict';
    return new DocumentationModel();
};

exports.ModelFactory.prototype.getTableModels = function(){
    'use strict';
    var tableModels = {};
    var databaseConfig = {
        username: process.env.username || 'dev',
        password: process.env.password || 'devP@a$$word',
        hostname: process.env.hostname || 'localhost',
        database: process.env.database || 'osm'
    };

    for (var i in settings.tables){
        tableModels.push(new TableModel(settings.tables[i], databaseConfig));
    }
};
