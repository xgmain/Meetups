using Application.Core;
using Application.Meetups.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Meetups.Queries;

public class GetMeetupDetails
{
    public class Query : IRequest<Result<MeetupDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<MeetupDto>>
    {
        public async Task<Result<MeetupDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var meetup = await context.Meetups
                .ProjectTo<MeetupDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (meetup == null) return Result<MeetupDto>.Failure("Meetup not found", 404);

            return Result<MeetupDto>.Success(mapper.Map<MeetupDto>(meetup));
        }
    }
}