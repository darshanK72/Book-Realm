namespace Book_Realm_API.DTO
{
    public class ReviewDTO
    {
        public string Id { get; set; }
        public string Comment { get; set; }
        public float Rating { get; set; }
        public string Date { get; set; }
        public string UserId { get; set; }
        public string BookId { get; set; }
    }

}
