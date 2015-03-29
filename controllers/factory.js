/**
 * Created by christopherfricke on 3/28/15.
 */
var ModelFactory = require('../models/factory').ModelFactory,
    TableController = require('./table').TableController,
    DocumentationController = require('./documentation').DocumentationController;

exports.ControllerFactory = function(modelFactory) {
    'use strict';
    this.modelFactory = modelFactory || new ModelFactory();
};

exports.ControllerFactory.prototype.getDocumentationController = function(){
    'use strict';
    return new DocumentationController(this.modelFactory);
};

exports.ControllerFactory.prototype.getTableController = function(){
    'use strict';
    return new TableController(this.modelFactory);
};