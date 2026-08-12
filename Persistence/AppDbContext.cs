using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options){
    public required DbSet<Meetup> Meetups { get; set; }
    public DbSet<MeetupAttendee> MeetupAttendees { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<MeetupAttendee>(x => x.HasKey(a => new { a.MeetupId, a.UserId }));

        builder.Entity<MeetupAttendee>()
            .HasOne(x => x.User)
            .WithMany(x => x.Meetups)
            .HasForeignKey(x => x.UserId);

        builder.Entity<MeetupAttendee>()
            .HasOne(x => x.Meetup)
            .WithMany(x => x.Attendees)
            .HasForeignKey(x => x.MeetupId);
    }
}