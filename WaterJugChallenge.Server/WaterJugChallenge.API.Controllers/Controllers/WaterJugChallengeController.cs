using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;
using WaterJugChallenge.API.Controllers.DTOs;
using WaterJugChallenge.Interfaces;

namespace WaterJugChallenge.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WaterJugChallengeController : ControllerBase
    {
        readonly IWaterJugChallengeSolutionFinder SolutionFinder;

        public WaterJugChallengeController(IWaterJugChallengeSolutionFinder solutionFinder)
            => SolutionFinder = solutionFinder;

        [HttpGet("FindSolution")]
        public FindChallengeSolutionResponse Get([FromQuery] FindChallengeSolutionRequest req)
        {
            var solution = SolutionFinder.FindSolution(req.Jug1Capacity, req.Jug2Capacity, req.TargetAmount);
            return new FindChallengeSolutionResponse
            {
                ChallengeSolutionSteps = solution
            };
        }
    }
}
