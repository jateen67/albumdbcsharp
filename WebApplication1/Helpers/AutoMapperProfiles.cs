using AutoMapper;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Helpers
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
