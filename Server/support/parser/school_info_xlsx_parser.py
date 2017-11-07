from openpyxl import load_workbook

from db.models.school import SchoolModel

WEB_URLS = {
    '서울특별시': 'stu.sen.go.kr',
    '부산광역시': 'stu.pen.go.kr',
    '대구광역시': 'stu.dge.go.kr',
    '인천광역시': 'stu.ice.go.kr',
    '광주광역시': 'stu.gen.go.kr',
    '대전광역시': 'stu.dje.go.kr',
    '울산광역시': 'stu.use.go.kr',
    '세종특별자치시': 'stu.sje.go.kr',
    '경기도': 'stu.cbe.go.kr',
    '강원도': 'stu.kwe.go.kr',
    '충청북도': 'stu.cbe.go.kr',
    '충청남도': 'stu.cne.go.kr',
    '전라북도': 'stu.jbe.go.kr',
    '전라남도': 'stu.jne.go.kr',
    '경상북도': 'stu.gbe.go.kr',
    '경상남도': 'stu.gne.go.kr',
    '제주특별자치도': 'stu.jje.go.kr'
}

wb = load_workbook('schoolcodes.xlsx')
sheet = wb['codes']


def parse():
    SchoolModel.objects().delete()
    # 파싱 전 제거

    for row in range(2, 3587):
        # 현재 학교 코드 엑셀에 있는 row 수
        code = sheet['A' + str(row)].value
        # 학교 코드

        region = sheet['B' + str(row)].value
        # 교육청

        web_url = WEB_URLS[region]
        # 나이스 URL

        name = sheet['C' + str(row)].value
        # 학교 이름

        SchoolModel(code=code, region=region, web_url=web_url, name=name).save()

    print('School data Parse Success')
