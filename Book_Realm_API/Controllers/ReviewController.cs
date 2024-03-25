using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.ReviewRespository;
using Book_Realm_API.DTO;
using Book_Realm_API.Utils.MappingHelper;

namespace Book_Realm_API.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IMappingHelper _mapper;

        public ReviewController(IReviewRepository reviewRepository,IMappingHelper mapper)
        {
            _reviewRepository = reviewRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ReviewDTO>>> GetReviews()
        {
            try
            {
                var reviews = await _reviewRepository.GetAllReviews();
                var reviewDtos = reviews.Select(r => _mapper.MapToReviewDTO(r)).ToList();
                return Ok(reviewDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReviewDTO>> GetReview(Guid id)
        {
            try
            {
                var review = await _reviewRepository.GetReviewById(id);
                var reviewDto = _mapper.MapToReviewDTO(review);
                return Ok(reviewDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("book/{id}")]
        public async Task<ActionResult<List<ReviewDTO>>> GetRevieswByBookId(Guid id)
        {
            try
            {
                var reviews = await _reviewRepository.GetReviewsByBookId(id);
                var reviewDtos = reviews.Select(r => _mapper.MapToReviewDTO(r)).ToList();
                return Ok(reviewDtos);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ReviewDTO>> CreateReview(ReviewDTO reviewDto)
        {
            try
            {
                var review = _mapper.MapToReview(reviewDto);
                var newReview = await _reviewRepository.CreateReview(review);
                reviewDto = _mapper.MapToReviewDTO(newReview);
                return CreatedAtAction("GetReview", new { id = review.Id }, reviewDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ReviewDTO>> UpdateReview(Guid id, ReviewDTO reviewDto)
        {
            try
            {
                var review = _mapper.MapToReview(reviewDto);
                var updatedReview = await _reviewRepository.UpdateReview(id, review);
                reviewDto = _mapper.MapToReviewDTO(updatedReview);
                return Ok(reviewDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ReviewDTO>> DeleteReview(Guid id)
        {
            try
            {
                var review = await _reviewRepository.DeleteReview(id);
                var reviewDto = _mapper.MapToReviewDTO(review);
                return Ok(reviewDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
