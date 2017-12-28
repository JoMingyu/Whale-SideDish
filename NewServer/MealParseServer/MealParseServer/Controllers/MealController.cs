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
        public MealController(MealContext context)
        {
            _context = context;

            if (_context.Meals.Count() == 0)
            {
                _context.Meals.Add(new MealMenu());
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<MealMenu> GetAll()
        {
            var meal = new Meal(Regions.Incheon, SchoolType.High, "E100001972", "2017", "12");
            var menus = meal.GetMealMenu();

            foreach (var element in menus)
                _context.Meals.Add(element);

            _context.SaveChanges();
            return _context.Meals.ToList();
        }

        //[HttpGet("{id}", Name = "GetTodo")]
        //public IActionResult GetById(long id)
        //{
        //    var item = _context.Meals.FirstOrDefault((_item) => _item.Id == id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }

        //    return new ObjectResult(item);
        //}

        [HttpGet("{code}/{year}/{month}/{day}")]
        public JsonResult GetMeal(string code, string year, string month, string day)
        {
            try
            {
                var meal = new Meal(CodeToRegion(code), SchoolType.High, code, year, month);
                var menus = meal.GetMealMenu();

                foreach (var element in menus)
                    _context.Meals.Add(element);

                _context.SaveChanges();

                var result
                    = _context.Meals.Where((x) => x.Date.ToShortDateString() == $"{year}-{month}-{day}").FirstOrDefault();

                var data = new
                {
                    Breakfast = result.Breakfast,
                    Lunch = result.Lunch,
                    Dinner = result.Dinner,
                    Date = result.Date,
                    IsExistMenu = result.IsExistMenu
                };

                return new JsonResult(data);
            }
            catch(Exception e)
            {
                var data = new
                {
                    Error = e,
                    Trace = e.StackTrace,
                    Data = e.Data
                };

                return new JsonResult(data);
            }
        }

        private Regions CodeToRegion(string code)
        {
            Regions result = Regions.Seoul;

            char firstLetter = code[0];
            if (firstLetter == 'B')
                result = Regions.Seoul;
            else if (firstLetter == 'C')
                result = Regions.Busan;
            else if (firstLetter == 'D')
                result = Regions.Daegu;
            else if (firstLetter == 'E')
                result = Regions.Incheon;
            else if (firstLetter == 'F')
                result = Regions.Gwangju;
            else if (firstLetter == 'G')
                result = Regions.Daejeon;
            else if (firstLetter == 'H')
                result = Regions.Ulsan;
            else if (firstLetter == 'I') { }
            else if (firstLetter == 'J')
                result = Regions.Gyeonggi;
            else if (firstLetter == 'K')
                result = Regions.Kangwon;
            else if (firstLetter == 'L') { }
            else if (firstLetter == 'M')
                result = Regions.Chungbuk;
            else if (firstLetter == 'N')
                result = Regions.Chungnam;
            else if (firstLetter == 'O') { }
            else if (firstLetter == 'P')
                result = Regions.Jeonbuk;
            else if (firstLetter == 'Q')
                result = Regions.Jeonnam;
            else if (firstLetter == 'R')
                result = Regions.Gyeongbuk;
            else if (firstLetter == 'S')
                result = Regions.Gyeongnam;
            else if (firstLetter == 'T')
                result = Regions.Jeju;

            return result;
        }
    }
}