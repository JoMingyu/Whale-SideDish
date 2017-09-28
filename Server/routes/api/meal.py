# -*- coding: utf8 -*-

from flask_restful import Resource, request
from threading import Thread

from db.models.meal import MealScheduleModel
from support.parser.meal_parser import parse


class Meal(Resource):
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
