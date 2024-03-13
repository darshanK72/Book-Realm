using Book_Realm_Server_API.Models;
using Book_Realm_Server_API.DTO;

namespace Book_Realm_Server_API.Utils.MappingHelper
{
    public interface IMappingHelper
    {
        UserDTO MapToUserDTO(User user);
        User MapToUser(UserDTO userView);
        CartDTO MapToCartDTO(Cart cart);
        Cart MapToCart(CartDTO cartDto);

        OrderDTO MapToOrderDTO(Order order);
        Order MapToOrder(OrderDTO orderDto);

        BillDTO MapToBillDTO(Bill bill);
        Bill MapToBill(BillDTO billDto);

        BookDTO MapToBookDTO(Book book);
        Book MapToBook(BookDTO bookDto);
    }

}
