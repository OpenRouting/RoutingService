/**
 * Created by christopherfricke on 4/11/15.
 */
var directionList = require('./directionlist').directionList;

function _init(){
    var directions = {
        "routes": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0585833861749,
                                38.803856929128,
                                0
                            ],
                            [
                                -77.0584480549773,
                                38.8038399822354,
                                0
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 20211,
                        "name": null,
                        "seq": 0,
                        "heading": 99.1288391380625,
                        "costlength": 15.25825998,
                        "costtime": 5.27368127856477,
                        "source": 604
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0584480549773,
                                38.8038399822354,
                                0
                            ],
                            [
                                -77.0584214980826,
                                38.8038366562813,
                                0
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 20205,
                        "name": null,
                        "seq": 1,
                        "heading": 99.1298052911267,
                        "costlength": 2.99423274,
                        "costtime": 26.8740632366474,
                        "source": 599
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0584214980826,
                                38.8038366562813,
                                0
                            ],
                            [
                                -77.0583940797035,
                                38.8038328164877,
                                0
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17251,
                        "name": null,
                        "seq": 2,
                        "heading": 100.187681095915,
                        "costlength": 3.10109289,
                        "costtime": 21.6233445364482,
                        "source": 40
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0583940797035,
                                38.8038328164877,
                                0
                            ],
                            [
                                -77.0583739879839,
                                38.8038300029724,
                                0
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17250,
                        "name": null,
                        "seq": 3,
                        "heading": 100.186901205614,
                        "costlength": 2.27242231,
                        "costtime": 29.5085995701213,
                        "source": 38
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0583739879839,
                                38.8038300029724,
                                0
                            ],
                            [
                                -77.0583671724658,
                                38.8038290480993,
                                0
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 20766,
                        "name": null,
                        "seq": 4,
                        "heading": 100.191830576404,
                        "costlength": 0.77086357,
                        "costtime": 86.9881553748869,
                        "source": 39
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0583671724658,
                                38.8038290480993,
                                0
                            ],
                            [
                                -77.0583491351932,
                                38.8038265223059,
                                0
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17248,
                        "name": null,
                        "seq": 5,
                        "heading": 100.186780878526,
                        "costlength": 2.04005859,
                        "costtime": 32.8696441997776,
                        "source": 37
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0583491351932,
                                38.8038265223059,
                                0
                            ],
                            [
                                -77.0583209658225,
                                38.8038225768036,
                                0
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17247,
                        "name": null,
                        "seq": 6,
                        "heading": 100.189035902143,
                        "costlength": 3.18604561,
                        "costtime": 21.0467796787128,
                        "source": 36
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0583209658225,
                                38.8038225768036,
                                0
                            ],
                            [
                                -77.0582911390601,
                                38.8038183995834,
                                0
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17246,
                        "name": null,
                        "seq": 7,
                        "heading": 100.188027109883,
                        "costlength": 3.37349121,
                        "costtime": 19.8773305829957,
                        "source": 35
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0582911390601,
                                38.8038183995834,
                                0
                            ],
                            [
                                -77.058286599873,
                                38.8038421405003,
                                0
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17254,
                        "name": null,
                        "seq": 8,
                        "heading": 8.47466126505648,
                        "costlength": 3.42873793,
                        "costtime": 19.5570502525983,
                        "source": 43
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.058286599873,
                                38.8038421405003,
                                0
                            ],
                            [
                                -77.058286599873,
                                38.8038421405003,
                                3
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 20746,
                        "name": null,
                        "seq": 9,
                        "heading": null,
                        "costlength": 3,
                        "costtime": 62.5856666666667,
                        "source": 43
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.058286599873,
                                38.8038421405003,
                                3
                            ],
                            [
                                -77.058286599873,
                                38.8038421405003,
                                6
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 20747,
                        "name": null,
                        "seq": 10,
                        "heading": null,
                        "costlength": 3,
                        "costtime": 62.5856666666667,
                        "source": 59
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.058286599873,
                                38.8038421405003,
                                6
                            ],
                            [
                                -77.058290947719,
                                38.8038206705575,
                                6
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17397,
                        "name": null,
                        "seq": 11,
                        "heading": 188.968117622792,
                        "costlength": 3.10485613,
                        "costtime": 21.5971359677783,
                        "source": 160
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.058290947719,
                                38.8038206705575,
                                6
                            ],
                            [
                                -77.0582575582382,
                                38.8038162798208,
                                6
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17387,
                        "name": null,
                        "seq": 12,
                        "heading": 99.5780201120167,
                        "costlength": 3.76944631,
                        "costtime": 17.7893500756614,
                        "source": 151
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0582575582382,
                                38.8038162798208,
                                6
                            ],
                            [
                                -77.0582472401888,
                                38.8038149231167,
                                6
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17386,
                        "name": null,
                        "seq": 13,
                        "heading": 99.5771498591504,
                        "costlength": 1.16483492,
                        "costtime": 57.5669554961488,
                        "source": 150
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0582472401888,
                                38.8038149231167,
                                6
                            ],
                            [
                                -77.0582509951467,
                                38.803791990053,
                                6
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 17384,
                        "name": null,
                        "seq": 14,
                        "heading": 187.271563002431,
                        "costlength": 3.30246042,
                        "costtime": 20.3048610647694,
                        "source": 149
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0582509951467,
                                38.803791990053,
                                6
                            ],
                            [
                                -77.0582478106191,
                                38.8037834619953,
                                6
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 20862,
                        "name": null,
                        "seq": 15,
                        "heading": 163.774839352008,
                        "costlength": 1.26873224,
                        "costtime": 52.8527595389237,
                        "source": 139
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -77.0582478106191,
                                38.8037834619953,
                                6
                            ],
                            [
                                -77.0582502297821,
                                38.8037699691526,
                                6
                            ]
                        ]
                    },
                    "properties": {
                        "gid": 20762,
                        "name": null,
                        "seq": 16,
                        "heading": 187.953982399228,
                        "costlength": 1.94612262,
                        "costtime": 34.4562050257655,
                        "source": 938
                    }
                }
            ]
        },
        "directions": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -77.05852,
                            38.803835,
                            10
                        ]
                    },
                    "properties": {
                        "direction_text": "Your Current Location",
                        "distance": 0,
                        "time": 0,
                        "waypoint_type": 'start'
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -77.0584214980826,
                            38.8038366562813,
                            0
                        ]
                    },
                    "properties": {
                        "direction_text": "1600 Duke Street",
                        "seq": 2,
                        "distance": 0,
                        "floor": "01",
                        "time": 0,
                        "facilityid": "001_01_01574",
                        "waypoint_type": 'door'
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -77.058286599873,
                            38.8038421405003,
                            0
                        ]
                    },
                    "properties": {
                        "direction_text": "Floor 01 Elevator",
                        "seq": 8,
                        "distance": 0,
                        "floor": "01",
                        "time": 0,
                        "facilityid": "001_002",
                        "waypoint_type": 'elevator'
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -77.058286599873,
                            38.8038421405003,
                            0
                        ]
                    },
                    "properties": {
                        "direction_text": "Floor 01 Elevator",
                        "seq": 9,
                        "distance": 0,
                        "floor": "01",
                        "time": 0,
                        "facilityid": "001_002",
                        "waypoint_type": 'elevator'
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -77.058286599873,
                            38.8038421405003,
                            3
                        ]
                    },
                    "properties": {
                        "direction_text": "Floor 02 Elevator",
                        "seq": 10,
                        "distance": 0,
                        "floor": "02",
                        "time": 0,
                        "facilityid": "001_002",
                        "waypoint_type": 'elevator'
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -77.058286599873,
                            38.8038421405003,
                            6
                        ]
                    },
                    "properties": {
                        "direction_text": "Floor 03 Elevator",
                        "seq": 11,
                        "distance": 0,
                        "floor": "03",
                        "time": 0,
                        "facilityid": "001_002",
                        "waypoint_type": 'elevator'
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -77.0582502297821,
                            38.803769969152576,
                            6
                        ]
                    },
                    "properties": {
                        "direction_text": "Men's Bathroom",
                        "distance": 0,
                        "time": 0,
                        "waypoint_type": 'end'
                    }
                }
            ]
        }
    };
    var d = directionList(directions.directions.features);
    for (var i in d){
        console.log(d[i].properties.direction_text)
    }
}

_init();