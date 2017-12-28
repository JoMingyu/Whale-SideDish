using Microsoft.EntityFrameworkCore;
using SchoolMeal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MealParseServer.Models
{
    public class MealContext : DbContext
    {
        public MealContext(DbContextOptions<MealContext> options) : base(options)
        {

        }

        public DbSet<MealMenu> Meals { get; set; }
    }
}
