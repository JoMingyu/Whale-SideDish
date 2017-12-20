using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MealParseServer.Models;
using System.Diagnostics;
using SchoolMeal;

namespace MealParseServer.Controllers
{
    [Route("api/meal")]
    public class MealController : Controller
    {
        private readonly MealContext _context;
        private readonly string _notAvailableText = "N/A";
        public MealController(MealContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<DayMeal> GetAll()
        {
            var meal = new Meal(Regions.Incheon, SchoolType.High, "E100000265", "2017", "11");
            var menus = meal.GetMealMenu();
            foreach (var element in menus)
            {
                _context.Meals.Add(new DayMeal
                {
                    Breakfast = string.Join(" / ", element.Breakfast ?? new List<string>()),
                    Lunch = string.Join(" / ", element.Lunch ?? new List<string>()),
                    Dinner = string.Join(" / ", element.Dinner ?? new List<string>())
                });
            }

            _context.SaveChanges();
            return _context.Meals.ToList();
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(long id)
        {
            var item = _context.Meals.FirstOrDefault((_item) => _item.Id == id);
            if (item == null)
            {
                return NotFound();
            }

            return new ObjectResult(item);
        }

        [HttpGet("{code}/{year}/{month}/{day}")]
        public MealMenu GetMeal(string code, string year, string month, string day)
        {
            //E100000265
            var meal = new Meal(Regions.Incheon, SchoolType.High, code, year, month);
            var menus = meal.GetMealMenu();

            var result 
                = menus.Where((x) => x.Date.ToShortDateString() == $"{year}-{month}-{day}").FirstOrDefault();

            return result;
        }
    }
}