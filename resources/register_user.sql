CREATE OR REPLACE FUNCTION public.register_user(p_username character varying, p_type smallint, p_auth character varying, p_firstname character varying, p_lastname character varying)
 RETURNS bit
 LANGUAGE plpgsql
AS $function$
declare v_uid int8;
begin
	insert into users_auth(username, auth, "type", created_on)
	values (p_username, p_auth, p_type, now())
	RETURNING user_id into v_uid;
	
	insert into users_info(user_id, firstname, lastname)
	values(v_uid, p_firstname, p_lastname);
	
	return 1;
end; $function$
