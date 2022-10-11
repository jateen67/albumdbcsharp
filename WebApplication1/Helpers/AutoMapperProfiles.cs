using AutoMapper;
using MusicDatabase.Dtos;
using MusicDatabase.Models;

namespace MusicDatabase.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Artist, ArtistDto>().ReverseMap();
            CreateMap<Album, AlbumDto>().ReverseMap();
        }
    }
}
