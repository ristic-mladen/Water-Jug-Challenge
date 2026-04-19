using System.Collections.Generic;
using WaterJugChallenge.Model.Common;

namespace WaterJugChallenge.API.Controllers.DTOs
{
    public class FindChallengeSolutionRequest
    {
        public int Jug1Capacity { get; set; }
        public int Jug2Capacity { get; set; }   
        public int TargetAmount { get; set; }
    }

    public class FindChallengeSolutionResponse
    {
        public List<ChallengeSolutionStep> ChallengeSolutionSteps { get; set; } = new();
    }
}
