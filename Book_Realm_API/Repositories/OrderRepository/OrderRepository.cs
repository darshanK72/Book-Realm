using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.OrderRepository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public OrderRepository(BookRealmDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return await _dbContext.Orders.ToListAsync();
        }

        public async Task<Order> GetOrderById(Guid id)
        {
            var order = await _dbContext.Orders.FindAsync(id);

            if (order == null)
            {
                throw new InvalidOperationException("Order not found");
            }

            return order;
        }

        public async Task<Order> CreateOrder(Order order)
        {
            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<Order> UpdateOrder(Guid id, Order order)
        {
            if (!OrderIdExists(id))
            {
                throw new InvalidOperationException("Order not found");
            }
            _dbContext.Entry(order).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<Order> DeleteOrder(Guid id)
        {
            var order = await _dbContext.Orders.FindAsync(id);
            if (order == null)
            {
                throw new InvalidOperationException("Order not found");
            }
            _dbContext.Orders.Remove(order);
            await _dbContext.SaveChangesAsync();
            return order;
        }

        private bool OrderIdExists(Guid id)
        {
            return _dbContext.Orders.Any(e => e.Id == id);
        }
    }
}
