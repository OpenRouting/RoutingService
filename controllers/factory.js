/**
 * Created by christopherfricke on 3/28/15.
 */
var ModelFactory = require('../models/factory').ModelFactory,
    TableController = require('./table').TableController,
    RouteController = require('./route').RouteController,
    DirectionController = require('./direction').DirectionController,
    DocumentationController = require('./documentation').DocumentationController;

exports.ControllerFactory = function(modelFactory) {
    'use strict';
    this.modelFactory = modelFactory || new ModelFactory();
    this.routeController = undefined;
    this.directionController = undefined;
    this.documentationController = undefined;
    this.tableController = undefined;
};

exports.ControllerFactory.prototype.getDocumentationController = function(){
    'use strict';
    if (this.documentationController == null){
        this.documentationController = new DocumentationController(this.modelFactory);
    }
    return this.documentationController
};

exports.ControllerFactory.prototype.getTableController = function(){
    'use strict';
    if (this.tableController == null){
        this.tableController = new TableController(this.modelFactory);
    }
    return this.tableController
};

exports.ControllerFactory.prototype.getRouteController = function(){
    'use strict';
    if (this.routeController == null){
        this.routeController = new RouteController(this.modelFactory);
    }
    return this.routeController
};

exports.ControllerFactory.prototype.getDirectionController = function(){
    'use strict';
    if (this.directionController == null){
        this.directionController = new DirectionController(this.modelFactory);
    }
    return this.directionController
};