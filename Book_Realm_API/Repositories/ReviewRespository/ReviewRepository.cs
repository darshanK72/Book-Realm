using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.ReviewRespository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public ReviewRepository(BookRealmDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Review>> GetAllReviews()
        {
            return await _dbContext.Reviews.ToListAsync();
        }

        public async Task<Review> GetReviewById(Guid id)
        {
            var review = await _dbContext.Reviews.FindAsync(id);

            if (review == null)
            {
                throw new InvalidOperationException("Review not found");
            }

            return review;
        }

        public async Task<List<Review>> GetReviewsByBookId(Guid id)
        {
            var reviews = await _dbContext.Reviews.Where(r => r.BookId == id).ToListAsync();

            if (reviews == null)
            {
                throw new InvalidOperationException("Review for book not found");
            }

            return reviews;
        }

        public async Task<Review> UpdateReview(Guid id, Review review)
        {
            if (!ReviewIdExists(id))
            {
                throw new InvalidOperationException("Review not found");
            }
            _dbContext.Entry(review).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return review;
        }

        public async Task<Review> CreateReview(Review review)
        {
            _dbContext.Reviews.Add(review);
            await _dbContext.SaveChangesAsync();
            return review;
        }

        public async Task<Review> DeleteReview(Guid id)
        {
            var review = await _dbContext.Reviews.FindAsync(id);
            if (review == null)
            {
                throw new InvalidOperationException("Review not found");
            }
            _dbContext.Reviews.Remove(review);
            await _dbContext.SaveChangesAsync();
            return review;
        }

        private bool ReviewIdExists(Guid id)
        {
            return _dbContext.Reviews.Any(e => e.Id == id);
        }
    }
}
