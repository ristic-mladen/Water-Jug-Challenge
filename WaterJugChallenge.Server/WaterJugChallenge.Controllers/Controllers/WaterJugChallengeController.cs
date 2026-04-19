using Microsoft.AspNetCore.Mvc;
using WaterJugChallenge.Controllers.DTOs;
using WaterJugChallenge.Interfaces;
using WaterJugChallenge.Model.Common;

namespace WaterJugChallenge.Controllers
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
