using Application.Core;
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
    
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Meetup>(request.MeetupDto);

            context.Meetups.Add(activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to edit the activity", 400);

            return Result<string>.Success(activity.Id);
        }
    }
}