using System;
using lab4.Models.ProcedureResponse;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace lab4.Models
{
    public partial class ModelContext : DbContext
    {
        public ModelContext()
        {
        }

        public ModelContext(DbContextOptions<ModelContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Audittable> Audittables { get; set; }
        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Host> Hosts { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Report> Reports { get; set; }
        public virtual DbSet<ReserveCarProcResponse> ReserveCarResponse { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseOracle("Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=myfirstdbpdb)));User ID=sys;Password=Tiger$tiger1;Persist Security Info=True;DBA Privilege=SYSDBA;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("SYS")
                .HasAnnotation("Relational:Collation", "USING_NLS_COMP");

            modelBuilder.Entity<Audittable>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("AUDITTABLE", "MY_TEMP_USER");

                entity.Property(e => e.Id)
                    .HasColumnType("NUMBER(38)")
                    .HasColumnName("ID");

                entity.Property(e => e.Operation)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("OPERATION");

                entity.Property(e => e.Operationdate)
                    .HasColumnType("DATE")
                    .HasColumnName("OPERATIONDATE");

                entity.Property(e => e.Tablename)
                    .HasMaxLength(80)
                    .IsUnicode(false)
                    .HasColumnName("TABLENAME");
            });

            modelBuilder.Entity<Car>(entity =>
            {
                entity.ToTable("CARS", "MY_TEMP_USER");

                entity.HasIndex(e => e.Model, "CAR_MODEL_IDX");

                entity.Property(e => e.Carid)
                    .HasPrecision(5)
                    .HasColumnName("CARID");

                entity.Property(e => e.Hostid)
                    .HasColumnType("NUMBER")
                    .HasColumnName("HOSTID");

                entity.Property(e => e.Mark)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("MARK");

                entity.Property(e => e.Model)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("MODEL");

                entity.Property(e => e.Plate)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .HasColumnName("PLATE");

                entity.Property(e => e.Price)
                    .HasColumnType("NUMBER(10,4)")
                    .HasColumnName("PRICE");

                entity.HasOne(d => d.Host)
                    .WithMany(p => p.Cars)
                    .HasForeignKey(d => d.Hostid)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_CAR_HOST");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("CUSTOMERS", "MY_TEMP_USER");

                entity.HasIndex(e => e.Licensenumber, "SYS_C007479")
                    .IsUnique();

                entity.Property(e => e.Customerid)
                    .HasPrecision(5)
                    .HasColumnName("CUSTOMERID");

                entity.Property(e => e.Dob)
                    .HasColumnType("DATE")
                    .HasColumnName("DOB");

                entity.Property(e => e.Licensenumber)
                    .IsRequired()
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasColumnName("LICENSENUMBER");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("NAME");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("SURNAME");
            });

            modelBuilder.Entity<Host>(entity =>
            {
                entity.ToTable("HOSTS", "MY_TEMP_USER");

                entity.Property(e => e.Hostid)
                    .HasColumnType("NUMBER")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("HOSTID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("NAME");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("SURNAME");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Customerid)
                    .HasName("PK_ORDERID");

                entity.ToTable("ORDERS", "MY_TEMP_USER");

                entity.Property(e => e.Customerid)
                    .HasPrecision(5)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CUSTOMERID");

                entity.Property(e => e.Carid)
                    .HasPrecision(5)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CARID");

                entity.Property(e => e.Orderid)
                    .HasPrecision(5)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ORDERID");

                entity.Property(e => e.Period)
                    .HasColumnType("NUMBER")
                    .HasColumnName("PERIOD");

                entity.Property(e => e.Reservationdate)
                    .HasColumnType("DATE")
                    .HasColumnName("RESERVATIONDATE");

                entity.Property(e => e.Returndate)
                    .HasColumnType("DATE")
                    .HasColumnName("RETURNDATE");

                entity.HasOne(d => d.Car)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Carid)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_CAR_ORDER");

                entity.HasOne(d => d.Customer)
                    .WithOne(p => p.Order)
                    .HasForeignKey<Order>(d => d.Customerid)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_CUSTOMER_ORDER");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("REPORT", "MY_TEMP_USER");

                entity.Property(e => e.ActualDaysInRent)
                    .HasColumnType("NUMBER(38)")
                    .HasColumnName("Actual days in rent");

                entity.Property(e => e.Customerid)
                    .HasPrecision(5)
                    .HasColumnName("CUSTOMERID");

                entity.Property(e => e.ExpectedEndPeriod)
                    .HasColumnType("DATE")
                    .HasColumnName("Expected end period");

                entity.Property(e => e.FinalPrice)
                    .HasColumnType("NUMBER")
                    .HasColumnName("Final price");

                entity.Property(e => e.Orderid)
                    .HasPrecision(5)
                    .HasColumnName("ORDERID");

                entity.Property(e => e.Reservationdate)
                    .HasColumnType("DATE")
                    .HasColumnName("RESERVATIONDATE");

                entity.Property(e => e.Status)
                    .HasMaxLength(12)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ReserveCarProcResponse>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.MReservationid)
                   .HasColumnName("mreservationid");
            });

            modelBuilder.HasSequence("AUDITSEQ", "MY_TEMP_USER");

            modelBuilder.HasSequence("ORDER_SEQ", "MY_TEMP_USER");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
