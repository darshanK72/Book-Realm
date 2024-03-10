using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories;
using Book_Realm_API.DTO;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.AspNetCore.Authorization;
using Book_Realm_API.Repositories.UserRepository;

namespace Book_Realm_API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMappingHelper _mapper;

        public UserController(IUserRepository userRepository,IMappingHelper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> GetUsers()
        {
            try
            {
                var users = await _userRepository.GetAllUsers();
                var usersView = users.Select((user) => _mapper.MapToUserDTO(user)).ToList();
                return Ok(usersView);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(Guid id)
        {
            try
            {
                var user = await _userRepository.GetUserById(id);
                var userDto = _mapper.MapToUserDTO(user);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> UpdateUser(Guid id, UserDTO userDto)
        {
            try
            {
                var user = _mapper.MapToUser(userDto);
                var updatedUser = await _userRepository.UpdateUser(id, user);
                userDto = _mapper.MapToUserDTO(user);
                return Ok(userDto);

            }
            catch(Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDTO>> DeleteUser(Guid id)
        {
            try
            {
                var user = await _userRepository.DeleteUser(id);
                var userDto = _mapper.MapToUserDTO(user);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}