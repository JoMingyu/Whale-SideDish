from flask import Flask, request, g
from flask_cors import CORS
from flask_restful_swagger_2 import Api

app = Flask(__name__)
CORS(app)

api = Api(app, api_version='1.0', title='SideDish API')


@app.before_first_request
def before_first_request():
    import logging
    from logging.handlers import RotatingFileHandler

    def initialize_logger():
        handler = RotatingFileHandler('server_log.log', maxBytes=100000, backupCount=5)
        handler.setFormatter(logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s'))

        app.logger.addHandler(handler)
        app.logger.setLevel(logging.INFO)

    initialize_logger()
    g.logger = app.logger
    g.logger.info('------ Logger initialized ------')


@app.before_request
def before_request():
    if 'logger' in g:
        g.logger.info('Requested from {0} [ {1} {2} ]'.format(request.host, request.method, request.url))
        g.logger.info('Request values : {0}'.format(request.values))


@app.after_request
def after_request(response):
    if 'logger' in g:
        g.logger.info('Respond : {0}'.format(response.status))

    return response


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
