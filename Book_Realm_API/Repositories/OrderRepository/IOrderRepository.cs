using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.OrderRepository
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllOrders();
        Task<Order> GetOrderById(Guid id);
        Task<Order> CreateOrder(Order order);
        Task<Order> UpdateOrder(Guid id, Order order);
        Task<Order> DeleteOrder(Guid id);
    }
}
