using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.ReviewRespository
{
    public interface IReviewRepository
    {
        Task<List<Review>> GetAllReviews();
        Task<Review> GetReviewById(Guid id);
        Task<List<Review>> GetReviewsByBookId(Guid id);
        Task<Review> UpdateReview(Guid id, Review review);
        Task<Review> CreateReview(Review review);
        Task<Review> DeleteReview(Guid id);
    }
}
