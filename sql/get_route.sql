-- Function: routing.get_route_by_id(integer, integer)

-- DROP FUNCTION routing.get_route_by_id(integer, integer);

CREATE OR REPLACE FUNCTION routing.get_route_by_id(IN originid integer, IN destinationid integer, OUT seq integer, OUT gid integer, OUT name text, OUT heading double precision, OUT cost double precision, OUT geom geometry)
  RETURNS SETOF record AS
$BODY$
	DECLARE
		query text;
		sub_query text;
		rec record;
		fromid integer;
		seq integer;
	BEGIN

		sub_query := 'SELECT gid as id, source::int, target::int, length::float AS cost ' ||
		             'FROM routing.ways ';

		query := 'SELECT id2 gid, the_geom, ST_Reverse(the_geom) AS flip_geom, name, cost, source, target ' ||
		         'FROM public.pgr_dijkstra(' || quote_literal(sub_query) || ', ' || originid || ', ' || destinationid || ', true, false), routing.ways ' ||
		         'WHERE id2 = gid ' ||
		         'ORDER BY seq';
		RAISE INFO ': %', query;

		fromid := originid;
		seq := 0;
		FOR rec IN EXECUTE query
		LOOP
			RAISE INFO ': %', seq;

			-- Flip geometry (if required)
			IF ( fromid != rec.source ) THEN
				rec.the_geom := rec.flip_geom;
				fromid := rec.source;
			ELSE
				fromid := rec.target;
			END IF;

			-- Calculate heading (simplified)
			EXECUTE 'SELECT degrees( ST_Azimuth(
					ST_StartPoint(''' || rec.the_geom::text || '''),
					ST_EndPoint(''' || rec.the_geom::text || ''') ) )'
				INTO heading;

			-- Return record
			seq     := seq + 1;
			gid     := rec.gid;
			name    := rec.name;
			cost    := rec.cost;
			geom    := rec.the_geom;
			RETURN NEXT;
		END LOOP;
		RETURN;
	END
$BODY$
  LANGUAGE plpgsql VOLATILE STRICT
  COST 100
  ROWS 1000;
ALTER FUNCTION routing.get_route_by_id(integer, integer)
  OWNER TO postgres;
