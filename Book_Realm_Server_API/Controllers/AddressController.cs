using Book_Realm_Server_API.Models;
using Book_Realm_Server_API.Repositories.AddressRepository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Book_Realm_Server_API.Controllers
{
    [Route("api/addresses")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly IAddressRepository _addressRepository;

        public AddressesController(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Address>>> GetAddresses()
        {
            try
            {
                var addresses = await _addressRepository.GetAllAddresses();
                return Ok(addresses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(Guid id)
        {
            try
            {
                var address = await _addressRepository.GetAddressById(id);
                return Ok(address);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddress(Guid id, Address address)
        {
            try
            {
                var updatedAddress = await _addressRepository.UpdateAddress(id, address);
                return Ok(updatedAddress);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Address>> PostAddress(Address address)
        {
            try
            {
                var newAddress = await _addressRepository.CreateAddress(address);
                return CreatedAtAction("GetAddress", new { id = address.Id }, newAddress);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Address>> DeleteAddress(Guid id)
        {
            try
            {
                var address = await _addressRepository.DeleteAddress(id);
                return Ok(address);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
