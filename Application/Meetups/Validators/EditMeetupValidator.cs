using System;
using Application.Meetups.Commands;
using Application.Meetups.DTOs;
using FluentValidation;

namespace Application.Meetups.Validators;

public class EditMeetupValidator : BaseMeetupValidator<EditMeetup.Command, EditMeetupDto>
{
    public EditMeetupValidator() : base(x => x.MeetupDto)
    {
        RuleFor(x => x.MeetupDto.Id)
            .NotEmpty().WithMessage("Id is required");
    }
}
