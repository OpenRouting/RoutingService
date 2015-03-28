/**
 * Created by christopherfricke on 3/27/15.
 */
var express = require('express');

exports.indexHandler = function (req, res) {
    res.json({
        "type": "FeatureCollection",
        "features": 'aasdfasdf'
    });
};
