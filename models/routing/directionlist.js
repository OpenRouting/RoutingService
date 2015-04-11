/**
 * Created by christopherfricke on 4/10/15.
 */
var util = require('util'),
    title = require('to-title-case');

var floorTransitionType = ['elevator', 'stairs', 'escalator'];
var startEndType = ['start', 'end'];

exports.directionList = function(directions){
    var cleanedDirections = [];

    var totalDistance = 0;
    var totalTime = 0;
    for (var i = (directions.length - 1); i >= 0; i--){
        // if direction name is the same as next then skip and aggregate
        if ((i !== 0 && directions[i].properties.direction_text === directions[i-1].properties.direction_text) ||
            (i !== 0 && i !== (directions.length-1) && directions[i].properties.facilityid === directions[i-1].properties.facilityid && directions[i].properties.facilityid === directions[i+1].properties.facilityid)){
            totalDistance += directions[i].properties.distance;
            totalTime += directions[i].properties.time;
        } else if (i !== 0 && i !== (directions.length-1) && directions[i].properties.facilityid === directions[i-1].properties.facilityid && directions[i].properties.facilityid !== directions[i+1].properties.facilityid){
            directions[i].properties.direction_text = title('Exit ' + directions[i].properties.waypoint_type + ' on Floor ' + directions[i].properties.floor);
            directions[i].properties.direction_type = util.format('%s_exit', directions[i].properties.waypoint_type.toLowerCase());
            cleanedDirections.push(directions[i])

        } else {
            directions[i].properties.distance += totalDistance;
            directions[i].properties.time += totalTime;

            if (floorTransitionType.indexOf(directions[i].properties.waypoint_type) >= 0){
                directions[i].properties.direction_text = util.format('Enter %s on Floor %s', directions[i].properties.waypoint_type, directions[i].properties.floor);
                directions[i].properties.direction_type = directions[i].properties.waypoint_type.toLowerCase();
            } else if (directions[i].properties.waypoint_type === 'start'){
                directions[i].properties.direction_text = util.format('Start at %s', directions[i].properties.direction_text);
                directions[i].properties.direction_type = 'depart';
            } else if (directions[i].properties.waypoint_type === 'end'){
                directions[i].properties.direction_text = util.format('Arrive at %s', directions[i].properties.direction_text);
                directions[i].properties.direction_type = 'arrive';
            }
            else {
                directions[i].properties.direction_text = util.format('Go through %s', directions[i].properties.direction_text);
                directions[i].properties.direction_type = 'continue';

            }

            directions[i].properties.direction_text = title(directions[i].properties.direction_text);
                totalDistance = 0;
            totalTime = 0;
            cleanedDirections.push(directions[i])
        }
    }

    return cleanedDirections.reverse();
};