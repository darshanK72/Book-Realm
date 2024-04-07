using Book_Realm_API.Models;
using Book_Realm_API.DTO;

namespace Book_Realm_API.Utils.MappingHelper
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
        GenreDTO MapToGenreDTO(Genre genre);
        Genre MapToGenre(GenreDTO genreDto);
        SubgenreDTO MapToSubgenreDTO(Subgenre subgenre);
        Subgenre MapToSubgenre(SubgenreDTO subgenreDto);
        AddressDTO MapToAddressDTO(Address address);
        Address MapToAddress(AddressDTO addressDto);
        CartItemDTO MapToCartItemDTO(CartItem cartItem);
        CartItem MapToCartItem(CartItemDTO cartItemDto);
        ImageDTO MapToImageDTO(Image image);
        Image MapToImage(ImageDTO imageDto);
        OrderItemDTO MapToOrderItemDTO(OrderItem orderItem);
        OrderItem MapToOrderItem(OrderItemDTO orderItemDto);
        ReviewDTO MapToReviewDTO(Review review);
        Review MapToReview(ReviewDTO reviewDto);
        WishlistDTO MapToWishlistDTO(Wishlist wishlist);
        Wishlist MapToWishlist(WishlistDTO wishlistDto);
        WishlistItemDTO MapToWishlistItemDTO(WishlistItem wishlistItem);
        WishlistItem MapToWishlistItem(WishlistItemDTO wishlistItemDto);
        HomeSectionDTO MapToHomeSectionDTO(HomePageSection homePageSection);
        HomePageSection MapToHomeSection(HomeSectionDTO homeSectionDto);
        BannerDTO MapToBannerDTO(Banner banner);
        Banner MapToBanner(BannerDTO bannerDto);
    }

}
