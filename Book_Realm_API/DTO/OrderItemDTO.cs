namespace Book_Realm_API.DTO
{
    public class OrderItemDTO
    {
        public string Id { get; set; }
        public string BookId { get; set; }
        public int Quantity { get; set; }
        public string OrderId { get; set; }
    }

}
