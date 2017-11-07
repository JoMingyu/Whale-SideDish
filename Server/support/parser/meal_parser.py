from urllib.request import urlopen
import re
from time import time
from bs4 import BeautifulSoup
from datetime import date

from db.models.school import SchoolModel
from db.models.meal import MealModel, MealScheduleModel

url_format = 'http://{0}/sts_sci_md00_001.do?schulCode={1}&schulCrseScCode=4&schulKndScScore=04&schYm={2}{3:0>2}'
# 급식 정보를 얻어오기 위한 기본 URL


def parse_all():
    schools = SchoolModel.objects()
    for school in schools:
        parse(school.code)


def parse(code):
    start_time = time()

    MealScheduleModel.objects(code=code).delete()
    # 파싱 전 제거

    web_rul = SchoolModel.objects(code=code).first().web_url
    # 나이스 URL

    cur_year = date.today().year
    # 현재 연도
    for year in range(cur_year, cur_year + 1):
        for month in range(1, 13):
            # 올해 전체 파싱

            res = urlopen(url_format.format(web_rul, code, year, month))
            soup = BeautifulSoup(res, 'html.parser')
            # soup ready

            monthly_data = [td.get_text() for td in soup.find(class_='tbl_type3 tbl_calendar').find_all('td')if td.get_text != ' ']
            # data list(하루 단위로 잘려 있음)

            for data in monthly_data:
                # data: str

                if len(data) > 1 and data != '자료가 없습니다.':
                    # 급식이 있을 경우
                    # sample: 12[조식]어린잎채소샐러드*1.5.12.햄콘치즈토스트*1.2.5.6.10.12.13. ...

                    day = int(re.findall('\d+', data)[0])
                    # 앞쪽의 숫자 부분을 day로 추려냄

                    daily_menus = re.findall('[가-힇]+', data)
                    # sample: ['조식', '어린잎채소샐러드*1.5.12.', '햄콘치즈토스트*1.2.5.6.10.12.13.', ...]

                    menu_dict = dict()

                    # timing = list(filter(lambda menu: re.findall('[조중석]{1}식', menu), daily_menus))
                    timing = [menu for menu in daily_menus if re.match('[조중석]{1}식', menu)]
                    # 조식, 중식, 석식 중 있는 데이터만

                    for i in range(len(timing)):
                        if i + 1 >= len(timing):
                            # 마지막 메뉴
                            menu_dict[timing[i]] = daily_menus[daily_menus.index(timing[i]) + 1:]
                        else:
                            menu_dict[timing[i]] = daily_menus[daily_menus.index(timing[i]) + 1: daily_menus.index(timing[i + 1])]

                    try:
                        menu_dict['breakfast'] = menu_dict.pop('조식', None)
                    except KeyError:
                        pass

                    try:
                        menu_dict['lunch'] = menu_dict.pop('중식', None)
                    except KeyError:
                        pass

                    try:
                        menu_dict['dinner'] = menu_dict.pop('석식', None)
                    except KeyError:
                        pass

                    meal = MealModel(breakfast=menu_dict['breakfast'], lunch=menu_dict['lunch'], dinner=menu_dict['dinner'])
                    MealScheduleModel(code=code, date='%04d-%02d-%02d' % (year, month, day), meal=meal).save()

    print('{0} Meal Parse Success during {1} seconds'.format(code, time() - start_time))
