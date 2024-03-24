using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.ReviewRespository;

namespace Book_Realm_API.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewsController(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Review>>> GetReviews()
        {
            try
            {
                var reviews = await _reviewRepository.GetAllReviews();
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(Guid id)
        {
            try
            {
                var review = await _reviewRepository.GetReviewById(id);
                return Ok(review);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("book/{id}")]
        public async Task<ActionResult<Review>> GetRevieswByBookId(Guid id)
        {
            try
            {
                var review = await _reviewRepository.GetReviewsByBookId(id);
                return Ok(review);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(Guid id, Review review)
        {
            try
            {
                var updatedReview = await _reviewRepository.UpdateReview(id, review);
                return Ok(updatedReview);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            try
            {
                var newReview = await _reviewRepository.CreateReview(review);
                return CreatedAtAction("GetReview", new { id = review.Id }, newReview);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Review>> DeleteReview(Guid id)
        {
            try
            {
                var review = await _reviewRepository.DeleteReview(id);
                return Ok(review);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
