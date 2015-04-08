# RoutingService
A routing service built in node. This service should act as an interface for many types of routing engines. Currently it support pgrouting.

## Routing Model
The primary idea of this repository is that different routing engines should be 
interchangeable. This interchangeability comes from an MVC style. Each routing engine
is a model that must follow an interface.

### buildRoute
Builds a linear route along a topological network.

#### Inputs
* points - A GeoJson 3D point feature collection. The points should be ordered start point to endpoint. The points 
should also include a name property and a floor property.
* restrictions - An array of strings for restrictions to pass into the routing function.
* callback - Callback function to communicate back to controller.

#### Outputs
* routes - A GeoJson 3D line feature collection. The lines should include the 
following properties: seq, name, heading, costlength, and costtime.

### buildDirections
Builds a linear route along a topological network and a list of point directions along the route.

#### Inputs
* points - A GeoJson 3D point feature collection. The points should be ordered start point to endpoint. The points 
should also include a name property and a floor property.
* restrictions - An array of strings for restrictions to pass into the routing function.
* callback - Callback function to communicate back to controller.

#### Outputs
* routes - A GeoJson 3D line feature collection. The lines should include the 
following properties: seq, name, heading, costlength, and costtime.
* directions - A GeoJson 3D point feature collection. The point features should 
include the following properties: direction_text, direction_type, seq, distance, and time.
