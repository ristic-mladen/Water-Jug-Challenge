using System.Collections.Generic;
using WaterJugChallenge.Model.Common;

namespace WaterJugChallenge.BFSSolutionFinder
{
    internal class ChallengeSolutionStepNode
    {
        public int Jug1WaterLevel { get; }
        public int Jug2WaterLevel { get; }
        public JugAction? ActionTaken { get; }
        public ChallengeSolutionStepNode? Parent { get; }

        public ChallengeSolutionStepNode(int j1, int j2, JugAction? action = null, ChallengeSolutionStepNode? parent = null)
        {
            Jug1WaterLevel = j1;
            Jug2WaterLevel = j2;
            ActionTaken = action;
            Parent = parent;
        }

        public List<ChallengeSolutionStep> BuildPath()
        {
            var path = new List<ChallengeSolutionStep>();
            ChallengeSolutionStepNode? current = this;

            while (current != null)
            {
                // We only include steps that have an action (skips the initial 0,0 state's null action)
                if (current.ActionTaken.HasValue)
                {
                    path.Add(new ChallengeSolutionStep
                    {
                        Jug1WaterLevel = current.Jug1WaterLevel,
                        Jug2WaterLevel = current.Jug2WaterLevel,
                        JugAction = current.ActionTaken.Value
                    });
                }
                current = current.Parent;
            }

            path.Reverse();
            return path;
        }
    }
}
