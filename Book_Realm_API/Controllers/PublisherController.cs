using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories;

namespace Book_Realm_API.Controllers
{
    [Route("api/publisher")]
    [ApiController]
    public class PublisherController : ControllerBase
    {
        
            private readonly IPublisherRepository _publisherRepository;

            public PublisherController(IPublisherRepository publisherRepository)
            {
                _publisherRepository = publisherRepository;
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<Publisher>>> GetPublishers()
            {
                var publishers = await _publisherRepository.GetAllPublishersAsync();
                return Ok(publishers);
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<Publisher>> GetPublisher(int id)
            {
                var publisher = await _publisherRepository.GetPublisherByIdAsync(id);
                if (publisher == null)
                {
                    return NotFound();
                }
                return publisher;
            }

            [HttpPost]
            public async Task<ActionResult<Publisher>> CreatePublisher(Publisher publisher)
            {
                await _publisherRepository.CreatePublisherAsync(publisher);
                return CreatedAtAction(nameof(GetPublisher), new { id = publisher.Id }, publisher);
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> UpdatePublisher(int id, Publisher publisher)
            {
                if (id != publisher.Id)
                {
                    return BadRequest();
                }

                await _publisherRepository.UpdatePublisherAsync(id, publisher);
                return NoContent();
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeletePublisher(int id)
            {
                await _publisherRepository.DeletePublisherAsync(id);
                return NoContent();
            }
        }
    }
