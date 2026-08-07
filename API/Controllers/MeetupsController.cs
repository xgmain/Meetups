using System;
using Application.Meetups.Commands;
using Application.Meetups.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace API.Controllers;

public class MeetupsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Meetup>>> GetMeetups()
    {
        return await Mediator.Send(new GetMeetupList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Meetup>> GetMeetupDetail(string id)
    {
        return await Mediator.Send(new GetMeetupDetails.Query { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreateMeetup(Meetup meetup)
    {
        return Ok(await Mediator.Send(new CreateMeetup.Command { Meetup = meetup }));
    }

    [HttpPut]
    public async Task<IActionResult> Edit(Meetup meetup)
    {
        await Mediator.Send(new EditMeetup.Command { Meetup = meetup });

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await Mediator.Send(new DeleteMeetup.Command { Id = id });

        return Ok();
    }
}