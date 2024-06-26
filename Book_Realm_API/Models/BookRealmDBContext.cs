﻿using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Models
{
    public class BookRealmDbContext : DbContext
    {
        public BookRealmDbContext(DbContextOptions<BookRealmDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Subgenre> Subgenres { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<WishlistItem> WishlistItems { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<Hero> Heros { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<BookImage> BookImages { get; set; }
        public DbSet<ProfileImage> ProfileImages { get; set; }
        public DbSet<BannerImage> BannerImages { get; set; }
        public DbSet<HeroImage> HeroImages { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<BookTag> BookTags { get; set; }
        public DbSet<HomePageSection> HomePageSections { get; set; }
        public DbSet<BookInSection> BooksInSection { get; set; }
        public DbSet<BannerInSection> BannersInSection { get; set; }
        public DbSet<HeroInSection> HeroInSections { get; set;}
    }
}
