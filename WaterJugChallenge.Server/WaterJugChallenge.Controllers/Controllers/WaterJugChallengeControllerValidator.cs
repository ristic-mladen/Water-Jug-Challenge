using FluentValidation;
using WaterJugChallenge.Controllers.DTOs;

namespace WaterJugChallenge.Controllers
{
    public class WaterJugChallengeControllerValidator : AbstractValidator<FindChallengeSolutionRequest>
    {
        public WaterJugChallengeControllerValidator()
        {
            RuleFor(c => c.Jug1Capacity)
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(c => c.Jug2Capacity)
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(c => c.TargetAmount)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
