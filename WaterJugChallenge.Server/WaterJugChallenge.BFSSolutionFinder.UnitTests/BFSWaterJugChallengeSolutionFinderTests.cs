using NUnit.Framework;
using WaterJugChallenge.BFSSolutionFinder;
using WaterJugChallenge.Model.Common;
using System.Collections.Generic;
using System.Linq;

namespace WaterJugChallenge.BFSSolutionFinder.UnitTests
{
    [TestFixture]
    public class BFSWaterJugChallengeSolutionFinderTests
    {
        private BFSWaterJugChallengeSolutionFinder _finder;

        [SetUp]
        public void Setup()
        {
            _finder = new BFSWaterJugChallengeSolutionFinder();
        }

        [Test]
        [TestCase(3, 5, 4)]
        [TestCase(2, 10, 4)]
        public void FindSolution_OnValidInput_ReturnsPathToTarget(int jug1, int jug2, int target)
        {
            var result = _finder.FindSolution(jug1, jug2, target);

            Assert.That(result, Is.Not.Empty, "A solution should exist for these parameters.");

            var lastStep = result.Last();
            bool targetReached = lastStep.Jug1WaterLevel == target || lastStep.Jug2WaterLevel == target;

            Assert.That(targetReached, Is.True, "The final step in the path should reach the target amount.");
        }

        [Test]
        public void FindSolution_TargetGreaterThanBothCapacities_ReturnsEmptyList()
        {
            int jug1 = 3;
            int jug2 = 5;
            int target = 10;

            var result = _finder.FindSolution(jug1, jug2, target);

            Assert.That(result, Is.Empty, "Should fail fast when target is larger than both jugs.");
        }

        [Test]
        public void FindSolution_OnImpossibleTarget_ReturnsEmptyList()
        {
            int jug1 = 2;
            int jug2 = 4;
            int target = 3;

            var result = _finder.FindSolution(jug1, jug2, target);

            Assert.That(result, Is.Empty);
        }

        [Test]
        public void FindSolution_OnTargetIsOneOfCapacities_ReturnsShortPath()
        {
            var result = _finder.FindSolution(3, 5, 3);

            Assert.That(result.Count, Is.GreaterThan(0));
            Assert.That(result.Last().Jug1WaterLevel, Is.EqualTo(3));
        }
    }
}