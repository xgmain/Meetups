using System;
using Application.Meetups.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {   
        CreateMap<Meetup, Meetup>();
        CreateMap<CreateMeetupDto, Meetup>();
        CreateMap<EditMeetupDto, Meetup>();
    }
}
