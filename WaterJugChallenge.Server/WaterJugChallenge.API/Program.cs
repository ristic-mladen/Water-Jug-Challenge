
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi;
using Scalar.AspNetCore;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Enums;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using WaterJugChallenge.API.Controllers;
using WaterJugChallenge.BFSSolutionFinder;
using WaterJugChallenge.Interfaces;

namespace WaterJugChallenge.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var allowedOrigins = builder.Configuration.GetValue<string>("AllowedOrigins")?.Split(',') ?? Array.Empty<string>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("LocalhostPolicy",
                    policy =>
                    {
                        policy.WithOrigins(allowedOrigins)
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            builder.Services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });
            builder.Services.AddOpenApi(options =>
            {
                options.AddOperationTransformer((operation, context, cancellationToken) =>
                {
                    if (operation.Parameters != null)
                        foreach (var parameter in operation.Parameters)
                            if (parameter is OpenApiParameter concreteParam && !string.IsNullOrEmpty(concreteParam.Name))
                                concreteParam.Name = char.ToLowerInvariant(concreteParam.Name[0]) + concreteParam.Name.Substring(1);
                    return Task.CompletedTask;
                });
            });
            builder.Services.Configure<RouteOptions>(options =>
            {
                options.LowercaseUrls = true;
                options.LowercaseQueryStrings = true;
            });

            builder.Services.AddValidatorsFromAssemblyContaining<WaterJugChallengeControllerValidator>();
            builder.Services.AddFluentValidationAutoValidation(configuration =>
            {
                configuration.DisableBuiltInModelValidation = true;
                configuration.ValidationStrategy = ValidationStrategy.All;
            });

            builder.Services.AddSingleton<IWaterJugChallengeSolutionFinder, BFSWaterJugChallengeSolutionFinder>();
            
            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }

            app.UseHttpsRedirection();

            app.UseCors("LocalhostPolicy");

            app.MapControllers();

            app.Run();
        }
    }
}
