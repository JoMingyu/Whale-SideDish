from flask_restful_swagger_2 import swagger, Resource, request

from db.models.meal import MealScheduleModel
from db.models.school import SchoolModel
from routes.api import school_doc

from support.parser.meal_parser import parse


class School(Resource):
    @swagger.doc(school_doc.SCHOOL_GET)
    def get(self):
        """
        학교 검색
        """
        key = request.args.get('key')

        searched_school_data = [{
            'name': school.name,
            'code': school.code,
            'region': school.region
        } for school in SchoolModel.objects if key in school.name]

        if len(searched_school_data) == 0:
            return '', 204
        else:
            return searched_school_data

    @swagger.doc(school_doc.SCHOOL_POST)
    def post(self):
        """
        학교 등록
        """
        code = request.form.get('code')

        if not MealScheduleModel.objects(code=code):
            # 파싱되어 있지 않은 경우
            parse(code)

        return '', 201
