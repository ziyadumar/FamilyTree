using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Text;

namespace Kalathingal.Configuration.Attributes
{
    public class KalathingalAuthAttribute : Attribute, IResourceFilter
    {
        private string _claimRule;

        public KalathingalAuthAttribute(string claimRule)
        {
            _claimRule = claimRule;
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            if (!ClaimVerificationHelper.CheckClaimRule(_claimRule, context.HttpContext.User))
            {
                //Could not verify the claim Rule
                context.Result = new StatusCodeResult(401); //send unauthorized
            }
        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
            //nothing to do afterwards yet
        }
    }
}
