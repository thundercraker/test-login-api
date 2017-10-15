CREATE OR REPLACE FUNCTION public.get_auth_by_username_type(p_username character varying, p_type smallint)
 RETURNS TABLE(r_user_id bigint, r_auth character varying, r_created_on timestamp without time zone, r_last_login timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
	return QUERY select user_id, auth, created_on, last_login
	from users_auth
	where username = p_username and type = p_type;
END; $function$
