namespace API.DTO
{
    public class AddBookDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public DateTime Publication { get; set; }
        public string Category { get; set; }
        public string ISBN { get; set; }
        public int PageCount { get; set; }
        public string Cover { get; set; }
    }
}
