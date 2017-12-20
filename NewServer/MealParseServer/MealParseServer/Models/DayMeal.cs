using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MealParseServer.Models
{
    public class DayMeal
    {
        public long Id { get; set; }
        public string Breakfast { get; set; }
        public string Lunch { get; set; }
        public string Dinner { get; set; }
    }
}
