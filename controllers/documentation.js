/**
 * Created by christopherfricke on 3/28/15.
 */
var express = require('express');

exports.DocumentationController = function(modelFactory){
    this.model = modelFactory.getDocumentationModel();
};

exports.DocumentationController.prototype.documentation = function(callback){
    callback(this.model.documentation);
};