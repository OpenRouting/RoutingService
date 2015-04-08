UPDATE routing.waypoint AS waypoint
SET sourceid=(SELECT id::integer FROM routing.way_vertices_pgr WHERE ST_Z(the_geom) = ST_Z(shape) ORDER BY the_geom <-> shape LIMIT 1)