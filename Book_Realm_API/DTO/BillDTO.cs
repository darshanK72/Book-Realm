namespace Book_Realm_API.DTO
{
    public class BillDTO
    {
        public Guid Id { get; set; }
        public float SubTotal { get; set; }
        public float Discount { get; set; }
        public float Tax { get; set; }
        public float Shipping { get; set; }
        public float Total { get; set; }
        public Guid OrderId { get; set; }
        public Guid CartId { get; set; }
    }
}
