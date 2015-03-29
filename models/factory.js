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

exports.ModelFactory.prototype.getTableModel = function(table){
    'use strict';
    if (table == null){
        throw 'Table not configured';
    }

    return new TableModel(settings.tables[table], settings.database);
};

exports.ModelFactory.prototype.getTableModels = function(){
    'use strict';
    var tableModels = {};

    for (var i in settings.tables){
        tableModels.push(new TableModel(settings.tables[i], settings.database));
    }
};
