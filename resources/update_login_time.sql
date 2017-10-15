CREATE OR REPLACE FUNCTION public.update_login_time(p_userid bigint)
 RETURNS bit
 LANGUAGE plpgsql
AS $function$
begin
	update public.users_auth
	set last_login = now()
	where user_id = p_userid;
	
	return 1;
end; $function$
