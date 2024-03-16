using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.BillRepository
{
    public class BillRepository : IBillRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public BillRepository(BookRealmDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Bill>> GetAllBills()
        {
            return await _dbContext.Bills.ToListAsync();
        }

        public async Task<Bill> GetBillById(Guid id)
        {
            var bill = await _dbContext.Bills.FindAsync(id);

            if (bill == null)
            {
                throw new InvalidOperationException("Bill not found");
            }

            return bill;
        }

        public async Task<Bill> CreateBill(Bill bill)
        {
            _dbContext.Bills.Add(bill);
            await _dbContext.SaveChangesAsync();
            return bill;
        }

        public async Task<Bill> UpdateBill(Guid id, Bill bill)
        {
            if (!BillIdExists(id))
            {
                throw new InvalidOperationException("Bill not found");
            }
            _dbContext.Entry(bill).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return bill;
        }

        public async Task<Bill> DeleteBill(Guid id)
        {
            var bill = await _dbContext.Bills.FindAsync(id);
            if (bill == null)
            {
                throw new InvalidOperationException("Bill not found");
            }
            _dbContext.Bills.Remove(bill);
            await _dbContext.SaveChangesAsync();
            return bill;
        }

        private bool BillIdExists(Guid id)
        {
            return _dbContext.Bills.Any(e => e.Id == id);
        }
    }
}
