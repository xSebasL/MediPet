
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

select * from usuario;
select * from rol;

insert into rol (nombre) values ('administrador');
insert into rol (nombre,creado_por,actualizado_por) values ('propietario',1,1);
insert into rol (nombre,creado_por,actualizado_por) values ('veterinaria',1,1);
insert into rol (nombre,creado_por,actualizado_por) values ('fundacion',1,1);
insert into usuario (nombre,email,id_rol,password) values('sebastian','sebas@email.com',1,'sebastian');
insert into usuario (nombre,email,id_rol,password,creado_por,actualizado_por) values('mariana','mariana@email.com',2,'mariana',1,1);
insert into usuario (nombre,email,id_rol,password,creado_por,actualizado_por) values('Veterinaria la 32','vet32@email.com',3,'vet32',1,1);
insert into usuario (nombre,email,id_rol,password,creado_por,actualizado_por) values('Refugio Animal Santa Elena','refugiosantaelena@email.com',4,'refugiosantaelena',1,1);

ALTER TABLE rol
DROP COLUMN creado_por;

