from flask_restful_swagger_2 import swagger, Resource, request

from db.models.meal import MealScheduleModel
from routes.api import meal_doc


class Meal(Resource):
    @swagger.doc(meal_doc.MEAL_GET)
    def get(self, code):
        """
        급식 정보 획득
        """
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
