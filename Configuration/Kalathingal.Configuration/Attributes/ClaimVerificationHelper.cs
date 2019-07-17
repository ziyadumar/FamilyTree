using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Kalathingal.Configuration.Attributes
{
    public class ClaimVerificationHelper
    {
        public static bool CheckClaimRule(string claimRule, ClaimsPrincipal principal)
        {
            switch (claimRule)
            {
                case "Basic":
                    return CheckBasicUser(principal);               
                case "SuperAdmin":
                    return CheckSuperAdmin(principal);
                default:
                    throw new ClaimRuleNotDefinedException();
            }
        }

        public static long? GetUserId(HttpContext context)
        {
            ClaimsPrincipal principal = context.User;
            Claim userIdClaim = principal.FindFirst(c => c.Type == "UserID");

            if (userIdClaim == null) return null;

            //read the userId
            try
            {
                int userId = Int32.Parse(userIdClaim.Value);
                return userId;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool CheckBasicUser(ClaimsPrincipal principal)
        {
            //For Basic users we need the userId Claim
            Claim UserIdClaim = principal.FindFirst(c => c.Type == "UserID");
            if (UserIdClaim == null) return false; //NA if the claim itself is not present

            string val = UserIdClaim.Value;
            try
            {
                long userId = long.Parse(val);

                //Find the Basic Claim
                Claim BasicClaim = principal.FindFirst(c => c.Type == "Basic");
                if (BasicClaim == null)
                {
                    return false;
                }

            }
            catch (FormatException)
            {
                //not a valid integer value
                return false;
            }
            catch (Exception)
            {
                return false;
            }

            return true; // it passes this claimRule
        }

        public static bool CheckSuperAdmin(ClaimsPrincipal principal)
        {
            //Done for Hangfire Authentication, no null check could be bad -_-
            if (principal == null) return false;
            //super admin claim is with claimType SuperAdmin
            if (!CheckBasicUser(principal))
            {
                return false;
            }
            //Find the Super Admin Claim
            Claim SuperAdminClaim = principal.FindFirst(c => c.Type == "SuperAdmin");
            if (SuperAdminClaim == null)
            {
                return false;
            }

            return true; //this is correct otherwise
        }

    }

    public class ClaimRuleNotDefinedException : Exception { }
}
