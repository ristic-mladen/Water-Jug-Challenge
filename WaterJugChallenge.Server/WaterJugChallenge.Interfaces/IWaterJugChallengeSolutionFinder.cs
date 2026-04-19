using System.Collections.Generic;
using WaterJugChallenge.Model.Common;

namespace WaterJugChallenge.Interfaces
{
    public interface IWaterJugChallengeSolutionFinder
    {
        public List<ChallengeSolutionStep> FindSolution(int jug1Capacity, int Jug2Capacity, int targetAmount);
    }
}
