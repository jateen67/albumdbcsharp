namespace MusicDatabase.Data
{
    public class AppDbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope()) {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

                context.Database.EnsureCreated();

/*                if (!context.Albums.Any())
                {
                    context.Albums.AddRange(new List<Album>()
                    {
                        new Album()
                        {
                            Title = "The Strokes",
                            Description = "This is The Strokes",
                            Duration = 22,
                            Date = DateTime.Now,
                            Cover = "This is cover",
                            ArtistId = 9,
                        },
                    });;
                    context.SaveChanges();
                }*/
            }
        }
    }
}
