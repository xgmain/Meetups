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
}