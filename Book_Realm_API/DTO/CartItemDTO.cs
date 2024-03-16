namespace Book_Realm_API.DTO
{
    public class CartItemDTO
    {
        public string Id { get; set; }
        public string BookId { get; set; }
        public int Quantity { get; set; }
        public string CartId { get; set; }
    }

}
