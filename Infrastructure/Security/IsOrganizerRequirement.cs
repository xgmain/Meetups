using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsOrganizerRequirement : IAuthorizationRequirement
{
}

public class IsOrganizerRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) 
    : AuthorizationHandler<IsOrganizerRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOrganizerRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;
        
        var httpContext = httpContextAccessor.HttpContext;

        if (httpContext?.GetRouteValue("id") is not string meetupId) return;

        var attendee = await dbContext.MeetupAttendees
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.UserId == userId &&
                                       x.MeetupId == meetupId);
        
        if (attendee == null) return;
        
        if (attendee.IsOrganizer) context.Succeed(requirement);
    }
}