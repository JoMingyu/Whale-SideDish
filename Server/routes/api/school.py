# -*- coding: utf8 -*-

from flask_restful import Resource, request

from db.models.school import SchoolModel


class School(Resource):
    def get(self):
        key = request.args.get('key')
        searched_school_data = []
        schools = SchoolModel.objects()
        for school in schools:
            if key in school.name:
                searched_school_data.append({
                    'name': school.name,
                    'code': school.code,
                    'region': school.region
                })

        if len(searched_school_data) == 0:
            return '', 204
        else:
            return searched_school_data
