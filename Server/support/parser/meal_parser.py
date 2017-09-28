# -*- coding: utf8 -*-
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
    start_time = time.time()

    MealScheduleModel.objects(code=code).delete()
    # 파싱 전 제거

    web_rul = SchoolModel.objects(code=code).first().web_url
    # 나이스 URL

    cur_year = date.today().year
    # 현재 연도
    for year in range(cur_year, cur_year + 2):
        for month in range(1, 13):
            # 올해 ~ 내년 전체 파싱

            res = urlopen(url_format.format(web_rul, code, year, month))
            soup = BeautifulSoup(res, 'html.parser')
            # soup ready

            monthly_data = [td.get_text() for td in soup.body.find(class_='tbl_type3 tbl_calendar').tbody.find_all('td')]
            # data list(하루 단위로 잘려 있음)

            for data in monthly_data:
                # data: str

                if len(data) > 1 and data != '자료가 없습니다.':
                    # 급식이 있을 경우
                    # sample: 12[조식]어린잎채소샐러드*1.5.12.햄콘치즈토스트*1.2.5.6.10.12.13. ...

                    day = int(re.findall('\d+', data)[0])
                    # 앞쪽의 숫자 부분을 day로 추려냄

                    daily_menus = re.findall('[가-힇]+', data)
                    # 메뉴들만 가져옴
                    # sample: ['조식', '어린잎채소샐러드*1.5.12.', '햄콘치즈토스트*1.2.5.6.10.12.13.', ...]

                    menu_dict = dict()
                    if '조식' in daily_menus:
                        if '중식' in daily_menus:
                            menu_dict['breakfast'] = daily_menus[1: daily_menus.index('중식')]
                        elif '석식' in daily_menus:
                            menu_dict['breakfast'] = daily_menus[1: daily_menus.index('석식')]
                        else:
                            menu_dict['breakfast'] = daily_menus[1:]
                    else:
                        menu_dict['breakfast'] = '급식이 없습니다'

                    if '중식' in daily_menus:
                        if '석식' in daily_menus:
                            menu_dict['lunch'] = daily_menus[daily_menus.index('중식') + 1: daily_menus.index('석식')]
                        else:
                            menu_dict['lunch'] = daily_menus[daily_menus.index('중식') + 1:]
                    else:
                        menu_dict['lunch'] = '급식이 없습니다'

                    if '석식' in daily_menus:
                        menu_dict['dinner'] = daily_menus[daily_menus.index('석식') + 1:]
                    else:
                        menu_dict['dinner'] = '급식이 없습니다'

                    meal = MealModel(breakfast=str(menu_dict['breakfast']), lunch=str(menu_dict['lunch']), dinner=str(menu_dict['dinner']))
                    MealScheduleModel(code=code, date='%04d-%02d-%02d' % (year, month, day), meal=meal).save()

    print('{0} Meal Parse Success during {1} seconds'.format(code, time() - start_time))
