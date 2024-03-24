using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Book_Realm_API.Models;
using Microsoft.AspNetCore.Authorization;
using Book_Realm_API.Repositories.RoleRepository;

namespace Book_Realm_API.Controllers
{

    //[Authorize(Roles = "Admin")]
    [Route("api/roles")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;

        public RolesController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Role>>> GetRoles()
        {
            try
            {
                var roles = await _roleRepository.GetAllRoles();
                return Ok(roles);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }   
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRole(Guid id)
        {
            try
            {
                var role = await _roleRepository.GetRoleById(id);
                return Ok(role);
            }
            catch(Exception ex)
            {
                return NotFound(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRole(Guid id, Role role)
        {
            try
            {
                var updatedRole = await _roleRepository.UpdateRole(id,role);
                return Ok(updatedRole);
            }
            catch(Exception ex)
            {
                return NotFound(ex);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
            try
            {
                var newRole = await _roleRepository.CreateRole(role);
                return CreatedAtAction("GetRole", new { id = role.Id }, newRole);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Role>> DeleteRole(Guid id)
        {
            try
            {
                var role = await _roleRepository.DeleteRole(id);
                return Ok(role);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
