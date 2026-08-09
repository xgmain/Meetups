using System;
using Application.Meetups.Commands;
using Application.Meetups.DTOs;
using FluentValidation;

namespace Application.Meetups.Validators;

public sealed class CreateMeetupValidator : BaseMeetupValidator<CreateMeetup.Command, CreateMeetupDto>
{
    public CreateMeetupValidator() : base(x => x.MeetupDto)
    {
        
    }
}