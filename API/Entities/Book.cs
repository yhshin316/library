namespace WebApplication1.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public DateTime Publication {  get; set; }
        public string Category { get; set; }
        public string ISBN { get; set; }
        public int PageCount { get; set; }
        public byte[]? Cover { get; set; }
        public string? Username { get; set; }
        public DateTime? returnTime { get; set; }
    }
}
