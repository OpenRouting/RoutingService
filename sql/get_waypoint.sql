-- Function: routing.get_waypoint(geometry)

-- DROP FUNCTION routing.get_waypoint(geometry);

CREATE OR REPLACE FUNCTION routing.get_waypoint(test_geom geometry)
  RETURNS integer AS
$BODY$
    SELECT id::integer FROM routing.way_vertices_pgr ORDER BY the_geom <-> test_geom LIMIT 1;
$BODY$
  LANGUAGE sql VOLATILE
  COST 100;
ALTER FUNCTION routing.get_waypoint(geometry)
  OWNER TO routing;
