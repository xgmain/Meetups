using Application.Core;
using Application.Interfaces;
using Application.Meetups.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Meetups.Commands;

public class CreateMeetup
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateMeetupDto MeetupDto { get; set; }
    }
    
    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            
            var meetup = mapper.Map<Meetup>(request.MeetupDto);

            context.Meetups.Add(meetup);

            var attendee = new MeetupAttendee
            {
                MeetupId = meetup.Id,
                UserId = user.Id,
                IsOrganizer = true
            };
            
            meetup.Attendees.Add(attendee);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to edit the meetup", 400);

            return Result<string>.Success(meetup.Id);
        }
    }
}