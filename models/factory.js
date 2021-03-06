/**
 * Created by christopherfricke on 3/28/15.
 */
var DocumentationModel = require('./documentation').DocumentationModel,
    TableModel = require('./table').TableModel,
    PGRouteModel = require('./routing/pgrouting').RouteModel,
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

exports.ModelFactory.prototype.getRouteModel = function(type){
    'use strict';
    if (type == null || type === 'pgrouting'){
        return new PGRouteModel(settings.database);
    } else {
        return new PGRouteModel(settings.database);
    }
};