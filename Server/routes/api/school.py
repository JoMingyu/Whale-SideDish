# -*- coding: utf8 -*-

from flask_restful_swagger_2 import swagger, Resource, request

from db.models.school import SchoolModel


class School(Resource):
    @swagger.doc({
        'tags': ['학교'],
        'description': '학교 이름 검색',

        'parameters': [
            {
                'name': 'key',
                'description': '사용자의 검색 키워드',
                'in': 'query',
                'type': 'String'
            }
        ],

        'responses': {
            '200': {
                'description': '검색 성공(데이터 있음)',
                'examples': {
                    'application/json': [
                        {
                            "name": "대덕여자고등학교",
                            "code": "C100000376",
                            "region": "부산광역시"
                        },
                        {
                            "name": "대덕고등학교",
                            "code": "G100000167",
                            "region": "대전광역시"
                        },
                        {
                            "name": "대덕공업고등학교",
                            "code": "G100000168",
                            "region": "대전광역시"
                        },
                        {
                            "name": "대덕여자고등학교",
                            "code": "G100000169",
                            "region": "대전광역시"
                        },
                        {
                            "name": "대덕소프트웨어마이스터고등학교",
                            "code": "G100000170",
                            "region": "대전광역시"
                        },
                        {
                            "name": "대덕종합고등학교",
                            "code": "Q100000193",
                            "region": "전라남도"
                        }
                    ]
                }
            },
            '204': {
                'description': '검색 실패(데이터 없음)'
            }
        }
    })
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
