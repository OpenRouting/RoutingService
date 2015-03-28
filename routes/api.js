/**
 * Created by christopherfricke on 3/28/15.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.render('route', { title: 'Express' });
    res.render('direction', { title: 'Express' });
    res.render('table', { title: 'Express' });
});

module.exports = router;