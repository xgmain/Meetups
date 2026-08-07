using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Meetups.Commands;

public class EditMeetup
{
    public class Command : IRequest
    {
        public required Meetup Meetup { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var meetup = await context.Meetups.FindAsync([request.Meetup.Id], cancellationToken)
                           ?? throw new ArgumentException("Cannot find this meetup in the DB");

            mapper.Map(request.Meetup, meetup);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}