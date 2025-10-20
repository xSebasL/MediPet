select * from usuario;
select * from rol;
select * from mascotas;

/* TABLES */

create table rol(
	id serial primary key,
	nombre text unique not null,
	estado boolean default true,
	creado_en timestamp default null,
	actualizado_en timestamp default null
);

create table usuario(
	id serial primary key,
	nombre text not null,
	email text unique not null,
	id_rol int references rol(id),
	password text not null,
	estado boolean default true,
	creado_en timestamp default null,
	actualizado_en timestamp default null
);

  

create table mascotas (
	id serial primary key,
	nombre text not null,
	especie text not null,
	raza text,
	edad int not null check (edad >= 0),
	photo_url text,
	usuario_id int not null,
	creado_en timestamp default null,
	actualizado_en timestamp default null,
	constraint fk_usuario foreign key (usuario_id) references public.usuario (id) on delete cascade
);

/* TRIGGERS */

-- Trigger que asigna automáticamente fechas en creado_en y actualizado_en

create or replace function set_timestamp_fields()
returns trigger as $$
begin
	if TG_OP = 'INSERT' then
		new.creado_en := now();
		new.actualizado_en := now();
	elsif TG_OP = 'UPDATE' then
		new.actualizado_en := now();
	end if;
	return new;
end;
$$ language plpgsql;

create trigger tr_timestamps_table_rol
before insert or update on rol
for each row
execute function set_timestamp_fields();

create trigger tr_timestamps_table_usuario
before insert or update on usuario
for each row
execute function set_timestamp_fields();

create trigger tr_timestamps_table_mascota
before insert or update on mascotas
for each row
execute function set_timestamp_fields();

insert into rol (nombre) values ('administrador');
insert into rol (nombre) values ('propietario');
insert into rol (nombre) values ('veterinaria');
insert into rol (nombre) values ('fundacion');