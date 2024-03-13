using Book_Realm_Server_API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Book_Realm_Server_API.Repositories.AddressRepository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public AddressRepository(BookRealmDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Address>> GetAllAddresses()
        {
            return await _dbContext.Addresses.ToListAsync();
        }

        public async Task<Address> GetAddressById(Guid id)
        {
            var address = await _dbContext.Addresses.FindAsync(id);

            if (address == null)
            {
                throw new InvalidOperationException("Address not found");
            }

            return address;
        }

        public async Task<Address> UpdateAddress(Guid id, Address address)
        {
            if (!AddressIdExists(id))
            {
                throw new InvalidOperationException("Address not found");
            }
            _dbContext.Entry(address).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return address;
        }

        public async Task<Address> CreateAddress(Address address)
        {
            _dbContext.Addresses.Add(address);
            await _dbContext.SaveChangesAsync();
            return address;
        }

        public async Task<Address> DeleteAddress(Guid id)
        {
            var address = await _dbContext.Addresses.FindAsync(id);
            if (address == null)
            {
                throw new InvalidOperationException("Address not found");
            }
            _dbContext.Addresses.Remove(address);
            await _dbContext.SaveChangesAsync();
            return address;
        }

        private bool AddressIdExists(Guid id)
        {
            return _dbContext.Addresses.Any(e => e.Id == id);
        }
    }
}
