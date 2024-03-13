using System;
using System.Collections.Generic;

namespace Book_Realm_Server_API.DTO
{
    public class OrderDTO
    {
        public Guid Id { get; set; }
        public string Status { get; set; }
        public List<Guid> OrderItems { get; set; }
        public Guid BillId { get; set; }
        public Guid UserId { get; set; }
    }
}
