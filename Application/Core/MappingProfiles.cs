using System;
using Application.Meetups.DTOs;
using Application.Profiles.DTOs;
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
        CreateMap<Meetup, MeetupDto>()
            .ForMember(d => d.OrganizerId, o => o.MapFrom(s => 
                s.Attendees.FirstOrDefault(x => x.IsOrganizer)!.User.Id))
            .ForMember(d => d.OrganizerDisplayName, o => o.MapFrom(s => 
                s.Attendees.FirstOrDefault(x => x.IsOrganizer)!.User.DisplayName));
        CreateMap<MeetupAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));
    }
}
