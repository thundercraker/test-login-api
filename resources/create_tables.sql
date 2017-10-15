CREATE TABLE public.users_auth (
	user_id int8 NOT NULL DEFAULT nextval('users_auth_user_id_seq'::regclass),
	username varchar(60) NOT NULL,
	auth varchar(100) NOT NULL,
	"type" int2 NOT NULL,
	created_on timestamp NOT NULL,
	last_login timestamp NULL,
	CONSTRAINT users_auth_pkey PRIMARY KEY (user_id),
	CONSTRAINT users_auth_username_key UNIQUE (username)
)
WITH (
	OIDS=FALSE
) ;


CREATE TABLE public.users_info (
	user_id int8 NOT NULL,
	firstname varchar(100) NOT NULL,
	lastname varchar(100) NULL
)
WITH (
	OIDS=FALSE
) ;
