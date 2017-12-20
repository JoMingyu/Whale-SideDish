using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace SchoolMeal
{
    /// <summary>
    /// 나이스 홈페이지에서 가져온 급식메뉴 리스트를 제공합니다.
    /// </summary>
    [Serializable]
    public class Meal
    {
        /// <summary>
        /// 해당 교육기관의 관할지역(교육청)을 나타냅니다.
        /// </summary>
        public Regions Region { get; set; }

        /// <summary>
        /// 해당 교육기관의 종류를 나타냅니다.
        /// </summary>
        public SchoolType School { get; set; }
        public string Year { get; private set; }
        public string Month { get; set; }

        /// <summary>
        /// 해당 교육기관의 고유코드를 나타냅니다.
        /// </summary>
        public string SchoolCode { get; set; }

        /// <summary>
        /// 식단표 정보를 받기위한 변수를 지정하고 <see cref="Meal"/>클래스의 새 인스턴스를 초기화 합니다.
        /// </summary>
        /// <param name="region">해당 교육기관의 교육관할지역</param>
        /// <param name="type">해당 교육기관의 종류</param>
        /// <param name="schoolCode">해당 교육기관의 고유코드</param>
        public Meal(Regions region, SchoolType type, string schoolCode, string year, string month)
        {
            this.Region = region;
            this.SchoolCode = schoolCode;
            this.School = type;
            this.Year = year;
            this.Month = month;
        }

        /// <summary>
        /// 비동기로 급식메뉴를 나이스 홈페이지에서 불러와서 <see cref="List{T}"/>형태로 제공합니다.
        /// </summary>
        /// <exception cref="FaildToParseException"/>
        /// <returns></returns>
        public List<MealMenu> GetMealMenu()
        {
            try
            {
                string url =
                    "http://" + RegionToString(this.Region) + "/" + "sts_sci_md00_001.do" +
                    "?" + "schulCode=" + this.SchoolCode + "&" + "schulCrseScCode=" + SchoolTypeToInt(this.School) +
                    "&" + "schulKndScCode=" + "0" + SchoolTypeToInt(this.School) + "&" + "ay=" + this.Year + "&" + "mm=" + this.Month;

                // var doc = new HtmlWeb().Load(url, "GET");
                var doc = new HtmlWeb().Load(url);

                if (doc == null)
                {
                    throw new FaildToParseException();
                }
                var menu = MealParser.ParseHtml(doc, this.Year, this.Month);
                menu.RemoveAll(x => x == null);
                return menu;
            }
            catch (FaildToParseException)
            {
                throw new FaildToParseException();
            }
        }


        private string RegionToString(Regions region)
        {
            string result = null;
            switch (region)
            {
                case Regions.Seoul:
                    result = "stu.sen.go.kr";
                    break;
                case Regions.Incheon:
                    result = "stu.ice.go.kr";
                    break;
                case Regions.Busan:
                    result = "stu.pen.go.kr";
                    break;
                case Regions.Gwangju:
                    result = "stu.gen.go.kr";
                    break;
                case Regions.Daejeon:
                    result = "stu.dje.go.kr";
                    break;
                case Regions.Daegu:
                    result = "stu.dge.go.kr";
                    break;
                case Regions.Sejong:
                    result = "stu.sje.go.kr";
                    break;
                case Regions.Ulsan:
                    result = "stu.use.go.kr";
                    break;
                case Regions.Gyeonggi:
                    result = "stu.goe.go.kr";
                    break;
                case Regions.Kangwon:
                    result = "stu.kwe.go.kr";
                    break;
                case Regions.Chungbuk:
                    result = "stu.cbe.go.kr";
                    break;
                case Regions.Chungnam:
                    result = "stu.cne.go.kr";
                    break;
                case Regions.Gyeongbuk:
                    result = "stu.gbe.go.kr";
                    break;
                case Regions.Gyeongnam:
                    result = "stu.gne.go.kr";
                    break;
                case Regions.Jeonbuk:
                    result = "stu.jbe.go.kr";
                    break;
                case Regions.Jeonnam:
                    result = "jne.go.kr";
                    break;
                case Regions.Jeju:
                    result = "stu.jje.go.kr";
                    break;
                default:
                    break;
            }

            return result;
        }

        private int SchoolTypeToInt(SchoolType type)
        {
            int result = 0;
            switch (type)
            {
                case SchoolType.Kindergarden:
                    result = 1;
                    break;
                case SchoolType.Elementary:
                    result = 2;
                    break;
                case SchoolType.Middle:
                    result = 3;
                    break;
                case SchoolType.High:
                    result = 4;
                    break;
                default:
                    break;
            }

            return result;
        }
    }
    /// <summary>
    /// 해당 교육기관의 종류를 열거합니다.
    /// </summary>
     public enum SchoolType
        {
            /// <summary>
            /// 병설유치원
            /// </summary>
            Kindergarden,
            /// <summary>
            /// 초등학교
            /// </summary>
            Elementary,
            /// <summary>
            /// 중학교
            /// </summary>
            Middle,
            /// <summary>
            /// 고등학교
            /// </summary>
            High
        }

    /// <summary>
    /// 교육기관의 관할지역을 열거합니다.
    /// </summary>
    public enum Regions
        {
            /// <summary>
            /// 서울특별시
            /// </summary>
            Seoul,
            /// <summary>
            /// 인천광역시
            /// </summary>
            Incheon,
            /// <summary>
            /// 부산광역시
            /// </summary>
            Busan,
            /// <summary>
            /// 광주광역시
            /// </summary>
            Gwangju,
            /// <summary>
            /// 대전광역시
            /// </summary>
            Daejeon,
            /// <summary>
            /// 대구광역시
            /// </summary>
            Daegu,
            /// <summary>
            /// 세종특별자치시
            /// </summary>
            Sejong,
            /// <summary>
            /// 울산광역시
            /// </summary>
            Ulsan,
            /// <summary>
            /// 경기도
            /// </summary>
            Gyeonggi,
            /// <summary>
            /// 강원도
            /// </summary>
            Kangwon,
            /// <summary>
            /// 충청북도
            /// </summary>
            Chungbuk,
            /// <summary>
            /// 충청남도
            /// </summary>
            Chungnam,
            /// <summary>
            /// 경상북도
            /// </summary>
            Gyeongbuk,
            /// <summary>
            /// 경상남도
            /// </summary>
            Gyeongnam,
            /// <summary>
            /// 전라북도
            /// </summary>
            Jeonbuk,
            /// <summary>
            /// 전라남도
            /// </summary>
            Jeonnam,
            /// <summary>
            /// 제주특별자치도
            /// </summary>
            Jeju
        }
}
