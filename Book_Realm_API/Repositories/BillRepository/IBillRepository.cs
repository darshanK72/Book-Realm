using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.BillRepository
{
    public interface IBillRepository
    {
        Task<List<Bill>> GetAllBills();
        Task<Bill> GetBillById(Guid id);
        Task<Bill> CreateBill(Bill bill);
        Task<Bill> UpdateBill(Guid id, Bill bill);
        Task<Bill> DeleteBill(Guid id);
    }
}
