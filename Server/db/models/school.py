from db.mongodb import *


class SchoolModel(Document):
    code = StringField(required=True)
    region = StringField(required=True)
    web_url = StringField(required=True)
    name = StringField(required=True)
