-- Function: routing.get_route_by_id(integer, integer, text[])

DROP FUNCTION routing.get_route_by_id(integer, integer, text[]);

CREATE OR REPLACE FUNCTION routing.get_route_by_id(IN originid integer, IN destinationid integer, IN restrictions text[], OUT seq integer, OUT gid integer, OUT name text, OUT heading double precision, OUT costlength double precision, OUT source integer, OUT costtime double precision, OUT geom geometry)
  RETURNS SETOF record AS
$BODY$
	DECLARE
		query text;
		sub_query text;
		rec record;
		fromid integer;
    	BEGIN

		sub_query := 'SELECT objectid as id, source::int, target::int, (speed/length_meter)::float AS cost, (speed/length_meter)::float AS reverse_cost ' ||
		             'FROM routing.way';

		query := 'SELECT seq, id2 gid, shape, ST_Reverse(shape) AS flip_geom, name, cost costtime, length_meter costlength, source, target ' ||
		         'FROM public.pgr_dijkstra(' || quote_literal(sub_query) || ', ' || originid || ', ' || destinationid || ', true, true), routing.way ' ||
		         'WHERE id2 = objectid ' ||
		         'ORDER BY seq';
		RAISE INFO ': %', query;

		fromid := originid;
		FOR rec IN EXECUTE query
		LOOP
			-- Flip geometry (if required)
			IF ( fromid != rec.source ) THEN
				rec.shape := rec.flip_geom;
				fromid := rec.source;
			ELSE
				fromid := rec.target;
			END IF;

			-- Calculate heading (simplified)
			EXECUTE 'SELECT degrees( ST_Azimuth(
					ST_StartPoint(''' || rec.shape::text || '''),
					ST_EndPoint(''' || rec.shape::text || ''') ) )'
				INTO heading;

			-- Return record
			seq     := rec.seq;
			gid     := rec.gid;
			name    := rec.name;
			costlength    := rec.costlength;
			costtime := rec.costtime;
			source := rec.source;
			geom    := rec.shape;
			RETURN NEXT;
		END LOOP;
		RETURN;
	END
$BODY$
  LANGUAGE plpgsql VOLATILE STRICT
  COST 100
  ROWS 1000;
ALTER FUNCTION routing.get_route_by_id(integer, integer, text[])
  OWNER TO postgres;
