using Book_Realm_Server_API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Book_Realm_Server_API.Repositories.AddressRepository
{
    public interface IAddressRepository
    {
        Task<List<Address>> GetAllAddresses();
        Task<Address> GetAddressById(Guid id);
        Task<Address> UpdateAddress(Guid id, Address address);
        Task<Address> CreateAddress(Address address);
        Task<Address> DeleteAddress(Guid id);
    }
}
