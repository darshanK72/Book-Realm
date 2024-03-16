using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.DTO
{
    public class CartDTO
    {
        public string Id { get; set; }
        public List<string> CartItems { get; set; }
        public string BillId { get; set; }
        public string UserId { get; set; }
    }
}
