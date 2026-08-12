using System;

namespace Domain;

public class MeetupAttendee
{
    public string? UserId { get; set; }
    public User User { get; set; } = null!;
    public string? MeetupId { get; set; }
    public Meetup Meetup { get; set; } = null!;
    public bool IsOrganizer { get; set; }
    public DateTime DateJoined { get; set; } = DateTime.UtcNow;
}