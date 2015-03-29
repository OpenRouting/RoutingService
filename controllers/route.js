/**
 * Created by christopherfricke on 3/29/15.
 */
var express = require('express'),
    settings = require('../settings').settings;

exports.RouteController = function(modelFactory){
    this.modelFactory = modelFactory;

};

exports.RouteController.prototype.getRoute = function(points, restrictions){

};