MEAL_GET = {
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
                    "breakfast": [],
                    "lunch": [
                        "짜장덮밥",
                        "눈꽃치즈깨비탕수육",
                        "배추김치",
                        "요구르트",
                        "단무지"
                    ],
                    "dinner": [
                        "흑미밥비빔막국수",
                        "얼갈이된장국",
                        "보쌈",
                        "상추쌈",
                        "보쌈김치"
                    ]
                }
            }
        },
        '204': {
            'description': '반환할 급식 정보 없음'
        }
    }
}
