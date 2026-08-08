using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Meetups.Queries;

public class GetMeetupDetails
{
    public class Query : IRequest<Result<Meetup>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Meetup>>
    {
        public async Task<Result<Meetup>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Meetups.FindAsync([request.Id], cancellationToken);

            if (activity == null) return Result<Meetup>.Failure("Activity not found", 404);

            return Result<Meetup>.Success(activity);
        }
    }
}