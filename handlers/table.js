/**
 * Created by christopherfricke on 3/27/15.
 */
var express = require('express');

exports.tableHandler = function (req, res) {
    res.json({
        "type": "FeatureCollection",
        "features": 'aasdfasdf'
    });
};
exports.listTableHandler = function (req, res) {
    res.json({
        "type": "FeatureCollection",
        "features": 'aasdfasdf'
    });
}
