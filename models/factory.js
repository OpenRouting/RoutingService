/**
 * Created by christopherfricke on 3/28/15.
 */
var DocumentationModel = require('./documentation').DocumentationModel;

exports.ModelFactory = function() {
    'use strict';
};

exports.ModelFactory.prototype.getDocumentationModel = function(){
    'use strict';
    return new DocumentationModel();
};