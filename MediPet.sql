/* TABLES */

create table rol( -- solo rol admin puede ingresar y modificar
  id serial primary key,
  nombre text unique not null,
  estado boolean default true,
  creado_en timestamp default null,
  actualizado_en timestamp default null
);

create table usuario( -- solo rol admin puede ingresar y modificar
  id serial primary key,
  nombre text unique not null,
  email text unique not null,
  id_rol int references rol(id),
  password text not null, -- esta se asigna automaticamente con el mismo nombre y solo la podrá modificar cada usuario y no el administrador.
  estado boolean default true,
  creado_por int default null references usuario(id),
  actualizado_por int default null references usuario(id),
  creado_en timestamp default null,
  actualizado_en timestamp default null
);

alter table rol
add column creado_por int default null references usuario(id);

alter table rol
add column actualizado_por int default null references usuario(id);

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