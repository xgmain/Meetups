using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
    private ISender? _sender;

    protected ISender Mediator => _sender ??= HttpContext.RequestServices.GetRequiredService<ISender>();
    
    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);

        if (!result.IsSuccess && result.Code == 404)
            return NotFound();

        if (!result.IsSuccess && result.Code == 403)
            return Forbid();

        return BadRequest(result.Error);
    }
}