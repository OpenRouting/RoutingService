/**
 * Created by christopherfricke on 3/27/15.
 */
var express = require('express'),
    ControllerFactory = require('../controllers/factory.js').ControllerFactory,
    controllerFactory = new ControllerFactory(),
    tableController = controllerFactory.getTableController();

exports.tableHandler = function (req, res) {
    tableController.getRecords(req.params.table, function(err, data){
        if (err == null){
            res.json(data);
        } else {
            res.status(400).json(err)
        }
    });
};
exports.listTableHandler = function (req, res) {
    res.json(tableController.getTableList());

};
