namespace Book_Realm_API.DTO
{
    public class AddressDTO
    {
        public string Id { get; set; }
        public string Street1 { get; set; }
        public string Street2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int Pincode { get; set; }
        public string UserId { get; set; }
    }

}
