/**
 * Created by christopherfricke on 3/28/15.
 */
var express = require('express'),
    tableHandler = require('../handlers/table').tableHandler,
    listTableHandler = require('../handlers/table').listTableHandler,
    routeHandler = require('../handlers/route').routeHandler,
    routeUI = require('../handlers/route').routeUIHandler,
    directionHandler = require('../handlers/direction').directionHandler,
    indexHandler = require('../handlers/index').indexHandler;

var router = express.Router();

/* GET home page. */

router.get('/', indexHandler);
router.get('/route[/]?', routeUI);
router.post('/route[/]?', routeHandler);
router.post('/direction[/]?', directionHandler);
router.get('/table[/]?', listTableHandler);
router.get('/table/:table[/]?', tableHandler);

module.exports = router;