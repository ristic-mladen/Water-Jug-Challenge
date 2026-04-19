using System;
using System.Collections.Generic;
using WaterJugChallenge.Interfaces;
using WaterJugChallenge.Model.Common;

namespace WaterJugChallenge.BFSSolutionFinder
{
    public class BFSWaterJugChallengeSolutionFinder : IWaterJugChallengeSolutionFinder
    {
        public List<ChallengeSolutionStep> FindSolution(int jug1Capacity, int jug2Capacity, int targetAmount)
        {
            if (!IsTargetAmountValid(jug1Capacity, jug2Capacity, targetAmount)) // Fail fast - the target can never be achieved
                return new List<ChallengeSolutionStep>(); 

            var solutionStepNodesQueue = new Queue<ChallengeSolutionStepNode>();
            var visitedSteps = new HashSet<(int, int)>(); // Required to prevent the algorithm from going into an infinite loop

            var startChallengeSolutionStepNode = new ChallengeSolutionStepNode(0, 0);
            solutionStepNodesQueue.Enqueue(startChallengeSolutionStepNode);
            visitedSteps.Add((0, 0));

            while (solutionStepNodesQueue.Count > 0)
            {
                ChallengeSolutionStepNode currentSolutionStepNode = solutionStepNodesQueue.Dequeue();

                if (TargetAmountReached(currentSolutionStepNode, targetAmount))
                    return currentSolutionStepNode.BuildPath();

                foreach (var nextStep in GetAllPossibleMoves(currentSolutionStepNode, jug1Capacity, jug2Capacity))
                {
                    if (!visitedSteps.Contains((nextStep.Jug1WaterLevel, nextStep.Jug2WaterLevel)))
                    {
                        visitedSteps.Add((nextStep.Jug1WaterLevel, nextStep.Jug2WaterLevel));
                        solutionStepNodesQueue.Enqueue(nextStep);
                    }
                }
            }

            return new List<ChallengeSolutionStep>(); // Return empty list if no solution exists
        }

            private bool IsTargetAmountValid(int jug1Capacity, int jug2Capacity, int targetAmount)
                => targetAmount <= Math.Max(jug1Capacity, jug2Capacity);

            private bool TargetAmountReached(ChallengeSolutionStepNode currentSolutionStepNode, int targetAmount)
                => currentSolutionStepNode.Jug1WaterLevel == targetAmount || currentSolutionStepNode.Jug2WaterLevel == targetAmount;

            private IEnumerable<ChallengeSolutionStepNode> GetAllPossibleMoves(ChallengeSolutionStepNode node, int jug1Capacity, int jug2Capacity)
            {
                int jug1WaterLevel = node.Jug1WaterLevel;
                int jug2WaterLevel = node.Jug2WaterLevel;

                // Fill
                yield return new ChallengeSolutionStepNode(jug1Capacity, jug2WaterLevel, JugAction.FillJug1, node);
                yield return new ChallengeSolutionStepNode(jug1WaterLevel, jug2Capacity, JugAction.FillJug2, node);

                // Empty
                yield return new ChallengeSolutionStepNode(0, jug2WaterLevel, JugAction.EmptyJug1, node);
                yield return new ChallengeSolutionStepNode(jug1WaterLevel, 0, JugAction.EmptyJug2, node);

                // Pour Jug1 -> Jug2
                int amountToPourFrom1To2 = Math.Min(jug1WaterLevel, jug2Capacity - jug2WaterLevel);
                yield return new ChallengeSolutionStepNode(jug1WaterLevel - amountToPourFrom1To2, jug2WaterLevel + amountToPourFrom1To2, JugAction.PourJug1IntoJug2, node);

                // Pour Jug2 -> Jug1
                int amountToPourFrom2To1 = Math.Min(jug2WaterLevel, jug1Capacity - jug1WaterLevel);
                yield return new ChallengeSolutionStepNode(jug1WaterLevel + amountToPourFrom2To1, jug2WaterLevel - amountToPourFrom2To1, JugAction.PourJug2IntoJug1, node);
            }
    }
}
