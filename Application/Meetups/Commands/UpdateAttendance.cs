using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Meetups.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var meetup = await context.Meetups
                .Include(a => a.Attendees)
                .ThenInclude(u => u.User)
                .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (meetup == null) return Result<Unit>.Failure("Meetup not found", 404);

            var user = await userAccessor.GetUserAsync();

            var attendance = meetup.Attendees.FirstOrDefault(x => x.UserId == user.Id);
            var isOrganizer = meetup.Attendees.Any(x => x.IsOrganizer && x.UserId == user.Id);

            if (attendance != null)
            {
                if (isOrganizer) meetup.IsCancelled = !meetup.IsCancelled;
                else meetup.Attendees.Remove(attendance);
            }
            else
            {
                meetup.Attendees.Add(new MeetupAttendee
                {
                    UserId = user.Id,
                    MeetupId = meetup.Id,
                    IsOrganizer = false
                });
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating attendance", 400);
        }
    }
}