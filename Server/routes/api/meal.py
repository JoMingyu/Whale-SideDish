# -*- coding: utf8 -*-

from flask_restful_swagger_2 import swagger, Resource, request
from threading import Thread

from db.models.meal import MealScheduleModel
from support.parser.meal_parser import parse


class Meal(Resource):
    @swagger.doc({
        'tags': ['급식'],
        'description': '학교 코드를 이용한 급식 조회',

        'parameters': [
            {
                'name': 'code',
                'description': '학교 코드',
                'in': 'path',
                'type': 'String'
            },
            {
                'name': 'date',
                'description': '조회할 날짜',
                'in': 'query',
                'type': 'Date(YYYY-MM-DD)'
            }
        ],

        'responses': {
            '200': {
                'description': '급식 조회 성공(데이터 있음)',
                'examples': {
                    'application/json': {
                        "breakfast": "['시래기된장국', '돼지고기산적', '매운맛당면김말이', '케찹', '석박지', '도시락김', '보리밥']",
                        "lunch": "['감자탕', '순대야채볶음', '콩나물잡채', '배추김치', '보리밥', '파인애플']",
                        "dinner": "['김치알밥', '유부된장국', '배추겉절이', '파래돌김자반', '단호박부꾸미', '초코맛아이스크림']"
                    }
                }
            },
            '204': {
                'description': '급식 조회 실패(데이터 없음)'
            },
            '205': {
                'description': '학교 정보 자체가 없어서 서버에서 파싱할 예정(잠시 후 새로고침 요망)'
            }
        }
    })
    def get(self, code):
        if not MealScheduleModel.objects(code=code):
            # 해당 code에 대한 스케줄조차 없을 경우
            Thread(target=parse, args=(code,)).start()
            # 파싱 시작(스레딩)
            return '', 205
            # status 205: 콘텐츠 재설정

        date = request.args.get('date')

        schedule = MealScheduleModel.objects(code=code, date=date).first()
        if schedule:
            return {
                'breakfast': schedule.meal.breakfast,
                'lunch': schedule.meal.lunch,
                'dinner': schedule.meal.dinner
            }
        else:
            return '', 204
