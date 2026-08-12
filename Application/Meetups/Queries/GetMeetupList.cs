using Application.Core;
using Application.Meetups.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Meetups.Queries;

public class GetMeetupList
{
    public class Query : IRequest<Result<List<MeetupDto>>> { }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<MeetupDto>>>
    {
        public async Task<Result<List<MeetupDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var meetups = await context.Meetups
                .ProjectTo<MeetupDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return Result<List<MeetupDto>>.Success(meetups);
        }
    }
}