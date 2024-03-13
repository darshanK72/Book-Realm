using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_Server_API.DTO
{
    public class CartDTO
    {
        public Guid Id { get; set; }
        public List<Guid> CartItems { get; set; }
        public Guid BillId { get; set; }
        public Guid UserId { get; set; }
    }
}
