using System;
using Application.Meetups.Commands;
using Application.Meetups.Queries;
using Application.Meetups.DTOs;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

public class MeetupsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<MeetupDto>>> GetMeetups()
    {
        return HandleResult(await Mediator.Send(new GetMeetupList.Query()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MeetupDto>> GetMeetupDetail(string id)
    {
        return HandleResult(await Mediator.Send(new GetMeetupDetails.Query { Id = id }));
    }

    [HttpPost]
    public async Task<IActionResult> CreateMeetup(CreateMeetupDto meetupDto)
    {
        return HandleResult(await Mediator.Send(new CreateMeetup.Command { MeetupDto = meetupDto }));
    }

    [HttpPut]
    public async Task<IActionResult> Edit(EditMeetupDto meetupDto)
    {
        return HandleResult(await Mediator.Send(new EditMeetup.Command { MeetupDto = meetupDto }));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteMeetup.Command { Id = id }));
    }
    
    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend(string id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
    }
}