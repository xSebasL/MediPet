using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class MedipetContext : DbContext
{
    public MedipetContext()
    {
    }

    public MedipetContext(DbContextOptions<MedipetContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Mascota> Mascotas { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=medipet;Username=postgres;Password=Sebas_1234");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Mascota>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("mascotas_pkey");

            entity.ToTable("mascotas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ActualizadoEn)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("actualizado_en");
            entity.Property(e => e.CreadoEn)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("creado_en");
            entity.Property(e => e.Edad).HasColumnName("edad");
            entity.Property(e => e.Especie).HasColumnName("especie");
            entity.Property(e => e.Nombre).HasColumnName("nombre");
            entity.Property(e => e.PhotoUrl).HasColumnName("photo_url");
            entity.Property(e => e.Raza).HasColumnName("raza");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Mascota)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("fk_usuario");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("rol_pkey");

            entity.ToTable("rol");

            entity.HasIndex(e => e.Nombre, "rol_nombre_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ActualizadoEn)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("actualizado_en");
            entity.Property(e => e.CreadoEn)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("creado_en");
            entity.Property(e => e.Estado)
                .HasDefaultValue(true)
                .HasColumnName("estado");
            entity.Property(e => e.Nombre).HasColumnName("nombre");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("usuario_pkey");

            entity.ToTable("usuario");

            entity.HasIndex(e => e.Email, "usuario_email_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ActualizadoEn)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("actualizado_en");
            entity.Property(e => e.CreadoEn)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("creado_en");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Estado)
                .HasDefaultValue(true)
                .HasColumnName("estado");
            entity.Property(e => e.IdRol).HasColumnName("id_rol");
            entity.Property(e => e.Nombre).HasColumnName("nombre");
            entity.Property(e => e.Password).HasColumnName("password");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRol)
                .HasConstraintName("usuario_id_rol_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
