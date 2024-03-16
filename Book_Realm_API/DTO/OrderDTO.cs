using System;
using System.Collections.Generic;

namespace Book_Realm_API.DTO
{
    public class OrderDTO
    {
        public string Id { get; set; }
        public string Status { get; set; }
        public List<string> OrderItems { get; set; }
        public string BillId { get; set; }
        public string UserId { get; set; }
    }
}
