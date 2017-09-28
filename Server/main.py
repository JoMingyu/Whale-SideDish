# -*- coding: utf8 -*-

from flask import Flask, g
from flask_cors import CORS
from flask_restful_swagger_2 import Api

app = Flask(__name__)
CORS(app)

api = Api(app, api_version='1.0')


def add_resources():
    from routes.api.meal import Meal
    from routes.api.school import School

    api.add_resource(Meal, '/meal/<code>')
    api.add_resource(School, '/school-search')


def parse():
    from support.parser import school_info_xlsx_parser

    school_info_xlsx_parser.parse()


if __name__ == '__main__':
    add_resources()
    parse()
    app.run(debug=True)
