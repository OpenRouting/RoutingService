/**
 * Created by christopherfricke on 3/28/15.
 */
var express = require('express'),
    settings = require('../settings').settings;

exports.TableController = function(modelFactory){
    this.modelFactory = modelFactory;
};

exports.TableController.prototype.getTableList = function(){
    return settings.tables;
};

exports.TableController.prototype.getRecords = function(table, callback){
    var tableModel = this.modelFactory.getTableModel(table);
    tableModel.getRecords(callback);
};