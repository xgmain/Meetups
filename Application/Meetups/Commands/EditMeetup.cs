using Application.Core;
using Application.Meetups.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Meetups.Commands;

public class EditMeetup
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditMeetupDto MeetupDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var meetup = await context.Meetups.FindAsync([request.MeetupDto.Id, cancellationToken], cancellationToken: cancellationToken);

            if (meetup == null) return Result<Unit>.Failure("Meetup not found", 404);

            mapper.Map(request.MeetupDto, meetup);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to delete the meetup", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}