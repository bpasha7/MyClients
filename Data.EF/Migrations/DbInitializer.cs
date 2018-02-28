using System;
using System.Collections.Generic;
using System.Text;

namespace Data.EF.Migrations
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();
        }

        public static void Initialize(object context)
        {
            throw new NotImplementedException();
        }
    }
}
