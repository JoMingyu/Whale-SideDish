SCHOOL_GET = {
    'tags': ['학교'],
    'description': '학교 이름 검색',
    'parameters': [
        {
            'name': 'key',
            'description': '사용자의 검색 키워드',
            'in': 'query',
            'type': 'String',
            'required': True
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
}

SCHOOL_POST = {
    'tags': ['학교'],
    'description': '학교 등록',
    'parameters': [
        {
            'name': 'code',
            'description': '등록할 학교 코드',
            'in': 'formData',
            'type': 'String',
            'required': True
        }
    ],
    'responses': {
        '201': {
            'description': '학교 등록 성공(최대 5초까지 소요 가능)',
        }
    }
}
